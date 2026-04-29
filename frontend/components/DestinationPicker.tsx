"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MapPin, Search, Check, Loader2, Navigation2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";

// Leaflet instance for icons (will be initialized client-side)
let L: any;

interface Location {
  lat: number;
  lng: number;
  address: string;
  placeName?: string;
  postcode?: string;
  city?: string;
  state?: string;
  country?: string;
}

// Map Helper to change view
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom() > 14 ? map.getZoom() : 16);
      setTimeout(() => map.invalidateSize(), 100);
    }
  }, [center, map]);
  return null;
}

function MapCleanup() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [map]);
  return null;
}


function MapEvents({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}


export function DestinationPicker({ onConfirm, initialAddress }: { onConfirm: (loc: Location) => void, initialAddress?: string }) {
  const [query, setQuery] = useState(initialAddress || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setIsClient(true);
    import("leaflet").then(mod => { 
      L = mod.default; 
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    });
  }, []);


  const searchAddress = async (val: string) => {
    if (!val || val.length < 3) return;
    setLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&addressdetails=1&limit=5`, {
        headers: { 'User-Agent': 'FixrApp/1.0 (contact@fixr.com)' }
      });
      const data = await res.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Geocoding error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => searchAddress(val), 500);
  };

  const handleSelect = (s: any) => {
    const loc = {
      lat: parseFloat(s.lat),
      lng: parseFloat(s.lon),
      address: s.display_name,
      placeName: s.name || s.address?.building || s.address?.amenity,
      postcode: s.address?.postcode,
      city: s.address?.city || s.address?.town || s.address?.village || s.address?.suburb,
      state: s.address?.state,
      country: s.address?.country
    };
    setSelectedLocation(loc);
    setQuery(loc.address);
    setShowSuggestions(false);
  };

  const handleDragEnd = async (e: any) => {
    const marker = e.target;
    const { lat, lng } = marker.getLatLng();
    setLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
        headers: { 'User-Agent': 'FixrApp/1.0 (contact@fixr.com)' }
      });
      const data = await res.json();
      const loc = {
        lat,
        lng,
        address: data.display_name,
        placeName: data.name,
        postcode: data.address?.postcode,
        city: data.address?.city || data.address?.town || data.address?.village || data.address?.suburb,
        state: data.address?.state,
        country: data.address?.country
      };
      setSelectedLocation(loc);
      setQuery(loc.address);
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    } finally {
      setLoading(false);
    }
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
          headers: { 'User-Agent': 'FixrApp/1.0 (contact@fixr.com)' }
        });
        const data = await res.json();
        const loc = { 
          lat, 
          lng, 
          address: data.display_name, 
          placeName: data.name,
          postcode: data.address?.postcode,
          city: data.address?.city || data.address?.town || data.address?.village || data.address?.suburb,
          state: data.address?.state,
          country: data.address?.country
        };
        setSelectedLocation(loc);
        setQuery(loc.address);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    });
  };

  const handleMapClick = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
        headers: { 'User-Agent': 'FixrApp/1.0 (contact@fixr.com)' }
      });
      const data = await res.json();
      const loc = { 
        lat, 
        lng, 
        address: data.display_name, 
        placeName: data.name,
        postcode: data.address?.postcode,
        city: data.address?.city || data.address?.town || data.address?.village || data.address?.suburb,
        state: data.address?.state,
        country: data.address?.country
      };
      setSelectedLocation(loc);
      setQuery(loc.address);
    } catch (err) {
      console.error("Map click reverse geocoding error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return <div className="h-[400px] bg-slate-50 rounded-3xl animate-pulse" />;

  const emeraldIcon = L ? new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-emerald.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }) : null;

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="relative group">
          <input
            value={query}
            onChange={handleInputChange}
            placeholder="Type your address..."
            className="w-full h-16 rounded-2xl border border-slate-200 pl-14 pr-32 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all shadow-sm font-medium"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
            <button 
              onClick={useCurrentLocation}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-slate-100"
              title="Use my location"
            >
              <Navigation2 size={18} />
            </button>
            {query && (
              <button 
                onClick={() => { setQuery(""); setSelectedLocation(null); }}
                className="p-2.5 rounded-xl bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-[2000] left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
            >
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(s)}
                  className="w-full text-left p-4 hover:bg-slate-50 flex items-start gap-3 transition-colors border-b last:border-0 border-slate-100"
                >
                  <MapPin size={18} className="text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{s.name || "Address Result"}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{s.display_name}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-inner h-[400px] group bg-slate-50">
        <MapContainer
          center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : [27.4924, 77.6737]} // Default to Mathura as user mentioned it
          zoom={selectedLocation ? 16 : 13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapCleanup />
          <MapEvents onMapClick={handleMapClick} />

          {selectedLocation && (
            <>
              <ChangeView center={[selectedLocation.lat, selectedLocation.lng]} />
              <Marker
                position={[selectedLocation.lat, selectedLocation.lng]}
                draggable={true}
                eventHandlers={{ dragend: handleDragEnd }}
              />
            </>
          )}
        </MapContainer>

        
        {loading && (
          <div className="absolute inset-0 z-[1000] bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
              <Loader2 className="animate-spin text-emerald-600" size={20} />
              <span className="text-sm font-bold text-slate-900 tracking-tight">Geocoding...</span>
            </div>
          </div>
        )}

        {!selectedLocation && (
          <div className="absolute top-6 left-6 z-[1000] max-w-[240px]">
            <div className="bg-slate-900/90 backdrop-blur-md text-white p-5 rounded-3xl shadow-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                   <MapPin className="text-emerald-400" size={18} />
                </div>
                <p className="font-bold text-sm tracking-tight">Set Destination</p>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Search for an address or tap anywhere on the map to place your service pin.</p>
            </div>
          </div>
        )}

      </div>

      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-between gap-6"
          >
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Confirmed Destination</p>
              <p className="text-sm font-bold text-slate-950 line-clamp-1">{selectedLocation.address}</p>
            </div>
            <button
              onClick={() => onConfirm(selectedLocation)}
              className="px-8 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Check size={18} />
              Confirm Location
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
