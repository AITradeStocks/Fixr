"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Bot, Sparkles, MessageCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function SupportOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am the Fixr Enterprise Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    
    // Simulating AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "I've logged your request. Our professional coordinators typically respond in under 12 minutes for enterprise accounts." 
      }]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-end p-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-[400px] h-[600px] glass overflow-hidden flex flex-col pointer-events-auto shadow-2xl shadow-slate-900/10 border-white/50 rounded-[2.5rem]"
          >
            {/* Header */}
            <div className="p-6 bg-slate-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Fixr Support</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth" ref={scrollRef}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-white/50 border-t border-white">
              <div className="relative group">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="w-full h-14 rounded-2xl bg-white border border-slate-200 pl-5 pr-14 text-sm font-medium outline-none focus:border-emerald-500 transition-all shadow-inner"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-all active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
