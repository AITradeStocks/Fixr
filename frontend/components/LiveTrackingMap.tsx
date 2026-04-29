"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { io, Socket } from "socket.io-client";
import { MapPin, Navigation2, Phone, Clock, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { MapContainer, TileLayer, Marker, Polyline, useMap, Tooltip } from "react-leaflet";


let L: any;

interface LiveTrackingMapProps {
  jobId: string;
  destination: { lat: number, lng: number, address: string };
  contractorName: string;
  contractorPhone?: string;
}

function MapUpdater({ contractorPos, destination }: { contractorPos: [number, number] | null, destination: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    if (contractorPos) {
      const bounds = [contractorPos, destination];
      map.fitBounds(bounds as any, { padding: [50, 50] });
      setTimeout(() => map.invalidateSize(), 200);
    } else {
      map.setView(destination, 15);
      setTimeout(() => map.invalidateSize(), 200);
    }
  }, [contractorPos, destination, map]);
  return null;
}

function MapCleanup() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 500);
  }, [map]);
  return null;
}



export function LiveTrackingMap({ jobId, destination, contractorName, contractorPhone }: LiveTrackingMapProps) {
  const [contractorPos, setContractorPos] = useState<{ lat: number, lng: number } | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [eta, setEta] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

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

    // Fetch initial location
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${jobId}/location`)
      .then(r => r.json())
      .then(data => {
        if (data && data.lat && data.lng) {
          setContractorPos({ lat: data.lat, lng: data.lng });
          setLastUpdated(data.timestamp || new Date().toISOString());
        }
      })
      .catch(console.error);

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000");
    socket.emit("watch_job", { jobId });
    socket.on("location_update", (data) => {
      if (data.jobId === jobId) {
        setContractorPos({ lat: data.lat, lng: data.lng });
        setLastUpdated(data.timestamp || new Date().toISOString());
      }
    });

    // Fallback Polling every 4 seconds
    const intervalId = setInterval(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${jobId}/location`)
        .then(r => r.json())
        .then(data => {
          if (data && data.lat && data.lng) {
            setContractorPos({ lat: data.lat, lng: data.lng });
            setLastUpdated(data.timestamp || new Date().toISOString());
          }
        })
        .catch(console.error);
    }, 4000);

    return () => {
      socket.disconnect();
      clearInterval(intervalId);
    };
  }, [jobId]);

  // Calculate rough ETA and distance
  useEffect(() => {
    if (contractorPos && destination) {
      const R = 6371; // km
      const dLat = (destination.lat - contractorPos.lat) * Math.PI / 180;
      const dLon = (destination.lng - contractorPos.lng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(contractorPos.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      
      setDistance(d < 1 ? Math.round(d * 1000) + " m" : d.toFixed(1) + " km");
      
      // Assume 30km/h avg speed for rough ETA
      const timeHours = d / 30;
      const timeMins = Math.round(timeHours * 60) + 1;
      setEta(timeMins < 1 ? "Arriving" : timeMins + " mins");
    }
  }, [contractorPos, destination]);

  if (!isClient) return <div className="h-[450px] bg-slate-50 rounded-[2.5rem] animate-pulse" />;

  const destIcon = L ? new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }) : null;

  const proIcon = L ? new L.DivIcon({
    className: 'custom-pro-marker',
    html: '<div class="relative"><div class="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75"></div><div class="relative h-8 w-8 bg-slate-950 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-black shadow-lg">PRO</div></div>',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  }) : null;


  return (
    <div className="space-y-6">
      <div className="relative rounded-[2.5rem] overflow-hidden border border-white shadow-2xl h-[450px] bg-slate-100 group">
        <MapContainer
          center={[destination.lat, destination.lng]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapCleanup />
          <MapUpdater 
            contractorPos={contractorPos ? [contractorPos.lat, contractorPos.lng] : null} 
            destination={[destination.lat, destination.lng]} 
          />

          <Marker position={[destination.lat, destination.lng]} icon={destIcon}>
             <Tooltip direction="top" offset={[0, -40]} opacity={1} className="custom-tooltip">
                <span className="font-bold text-[10px] uppercase tracking-wider px-2 py-1 bg-white rounded-lg shadow-sm">Destination</span>
             </Tooltip>
          </Marker>

          {contractorPos && (
            <>
              <Marker position={[contractorPos.lat, contractorPos.lng]} icon={proIcon}>
                 <Tooltip direction="top" offset={[0, -20]} opacity={1} className="custom-tooltip">
                    <span className="font-bold text-[10px] uppercase tracking-wider px-2 py-1 bg-white rounded-lg shadow-sm">Contractor</span>
                 </Tooltip>
              </Marker>
              <Polyline 
                positions={[[contractorPos.lat, contractorPos.lng], [destination.lat, destination.lng]]} 
                dashArray="5, 10" 
                color="#10b981" 
                weight={2}
                opacity={0.4}
              />
            </>
          )}
        </MapContainer>

        {/* Floating Top Bar (Condensed) */}
        <div className="absolute top-4 left-4 right-4 z-[1000] flex justify-between items-center pointer-events-none">
           <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg border border-white/10 flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${contractorPos ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">
                 {contractorPos ? 'Live Sync Active' : 'Waiting for Signal'}
              </span>
           </div>

           <AnimatePresence>
             {lastUpdated && contractorPos && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-emerald-500/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-emerald-400/20 pointer-events-auto"
               >
                 <Zap size={12} className="animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest italic">{distance} away</span>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Compact Bottom Card */}
        <div className="absolute bottom-4 left-4 right-4 z-[1000]">
           <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl border border-slate-200/50 overflow-hidden">
              <div className="px-6 py-4">
                 <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-1">
                       <div className="h-10 w-10 rounded-xl bg-slate-950 flex items-center justify-center text-white text-sm font-black italic shadow-md">
                          {contractorName.charAt(0)}
                       </div>
                       <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Pro En Route</p>
                          <h4 className="text-sm font-black text-slate-950 tracking-tight italic">{contractorName}</h4>
                       </div>
                    </div>

                    <div className="flex items-center gap-3">
                       {contractorPos && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-100">
                             <Clock size={12} className="text-emerald-600" />
                             <span className="text-xs font-black text-emerald-700">{eta || "--"}</span>
                          </div>
                       )}
                       {contractorPhone && (
                         <a href={`tel:${contractorPhone}`} className="h-10 w-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all active:scale-95 pointer-events-auto">
                           <Phone size={18} />
                         </a>
                       )}
                    </div>
                 </div>

                 {!contractorPos && (
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-amber-600 bg-amber-50/50 p-2 rounded-lg border border-amber-100/50">
                       <Clock size={12} />
                       Awaiting contractor's first GPS heartbeat...
                    </div>
                 )}
              </div>
           </div>
        </div>



      </div>
      
      <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
         Property Integrity Network • Real-time Monitoring Active
      </p>
    </div>
  );
}
