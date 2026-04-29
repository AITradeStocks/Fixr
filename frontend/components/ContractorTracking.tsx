"use client";

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Navigation, MapPin, ShieldCheck, Zap, AlertTriangle, Play, Square, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContractorTrackingProps {
  jobId: string;
  contractorId: string;
  destination: { lat: number, lng: number, address: string };
}

export function ContractorTracking({ jobId, contractorId, destination }: ContractorTrackingProps) {
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastEmitted, setLastEmitted] = useState<Date | null>(null);
  const watchId = useRef<number | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000");
    socketRef.current = socket;

    socket.emit("join_job", { jobId });

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
      socket.disconnect();
    };
  }, [jobId]);

  const intervalRef = useRef<any>(null);

  const toggleTracking = () => {
    if (active) {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setActive(false);
    } else {
      if (!navigator.geolocation) {
        setError("GPS not supported on this device.");
        return;
      }

      setActive(true);
      setError(null);

      let lastPos: any = null;

      watchId.current = navigator.geolocation.watchPosition(
        (pos) => { lastPos = pos; },
        (err) => {
          setError(`GPS Error: ${err.message}`);
          setActive(false);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );

      intervalRef.current = setInterval(() => {
        if (lastPos && socketRef.current) {
          const { latitude: lat, longitude: lng, accuracy } = lastPos.coords;
          socketRef.current.emit("update_location", {
            jobId,
            contractorId,
            lat,
            lng,
            accuracy
          });
          setLastEmitted(new Date());
        }
      }, 4000);
    }
  };



  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl overflow-hidden relative group">
      {/* Background Glow */}
      <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full blur-[100px] transition-colors duration-1000 ${active ? 'bg-emerald-500/20' : 'bg-slate-800/20'}`} />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
           <div>
              <div className="flex items-center gap-3 mb-3">
                 <div className={`h-2 w-2 rounded-full ${active ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-slate-600'}`} />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Service Protocol: GPS Tracking</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter italic">Mission Navigation</h3>
           </div>

           <button 
             onClick={toggleTracking}
             className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3 shadow-xl active:scale-95 ${
               active 
               ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-white' 
               : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-900/20'
             }`}
           >
              {active ? (
                <>
                  <Square size={16} fill="currentColor" />
                  Stop Sharing
                </>
              ) : (
                <>
                  <Play size={16} fill="currentColor" />
                  Begin Transit
                </>
              )}
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700/50">
              <div className="flex items-center gap-4 mb-4">
                 <div className="h-10 w-10 rounded-xl bg-slate-700 flex items-center justify-center text-slate-300">
                    <MapPin size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Destination</p>
                    <p className="text-sm font-bold text-white line-clamp-1">{destination.address}</p>
                 </div>
              </div>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${destination.lat},${destination.lng}`}
                target="_blank"
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                 <ExternalLink size={14} />
                 External Navigation
              </a>
           </div>

           <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700/50 flex flex-col justify-between">
              <div>
                 <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sync Status</p>
                    <ShieldCheck size={16} className={active ? 'text-emerald-500' : 'text-slate-600'} />
                 </div>
                 <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-700 text-slate-500'}`}>
                       <Navigation size={20} className={active ? 'animate-pulse' : ''} />
                    </div>
                    <p className="text-sm font-black text-white italic">
                       {active ? 'Signal Transmitting' : 'Awaiting Deployment'}
                    </p>
                 </div>
              </div>
              
              {lastEmitted && active && (
                <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mt-4">
                   Last Heartbeat: {lastEmitted.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
              )}
           </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center gap-3"
          >
            <AlertTriangle size={18} />
            <p className="text-xs font-bold">{error}</p>
          </motion.div>
        )}

        <div className="mt-8 pt-8 border-t border-slate-800 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
           <Zap size={14} className={active ? 'text-emerald-500' : 'text-slate-700'} />
           <span>Privacy: Location shared with customer only during active mission.</span>
        </div>
      </div>
    </div>
  );
}
