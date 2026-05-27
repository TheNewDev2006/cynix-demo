import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { StatusChip } from '../components/ui/StatusChip';
import { Search, Package, CheckCircle, Clock, MapPin } from 'lucide-react';

export function PublicTrack() {
  const { packages } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
     e.preventDefault();
     if (!query.trim()) return;
     const found = packages.find(p => p.trackingNumber.toLowerCase() === query.trim().toLowerCase());
     setResult(found || null);
     setSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col p-4">
      <header className="py-6 mb-12 text-center">
         <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
               <Package className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white leading-none">CYNIX</h1>
         </div>
         <p className="text-white/60">Public Tracking Portal</p>
      </header>

      <div className="max-w-2xl mx-auto w-full flex-1">
         <GlassCard className="p-8 mb-8">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Track your shipment</h2>
            <form onSubmit={handleSearch} className="flex gap-4">
               <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input 
                     type="text" 
                     placeholder="Enter Tracking Number (e.g. CYN-1A2B3C)" 
                     className="search-pill pl-12 py-4 text-lg"
                     value={query}
                     onChange={e => setQuery(e.target.value)}
                  />
               </div>
               <Button type="submit" className="px-8 text-lg">Track</Button>
            </form>
         </GlassCard>

         {searched && !result && (
            <GlassCard className="p-8 text-center text-white/60">
               <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
               <p>No shipment found with tracking number "{query}".</p>
               <p className="text-sm mt-2">Please check the number and try again.</p>
            </GlassCard>
         )}

         {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
               <GlassCard className="p-6">
                  <div className="flex justify-between items-start mb-6 pb-6 border-b border-white/10">
                     <div>
                        <div className="text-white/60 text-sm uppercase tracking-wider mb-1">Tracking Number</div>
                        <div className="text-2xl font-mono text-white font-bold">{result.trackingNumber}</div>
                     </div>
                     <StatusChip status={result.status} />
                  </div>
                  
                  <div className="relative pl-6 border-l-2 border-white/10 space-y-8 pb-4">
                     {result.timeline.map((event, idx) => (
                        <div key={idx} className="relative">
                           <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-4 border-[rgba(15,23,42,1)] ${idx === result.timeline.length - 1 ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]' : 'bg-white/40'}`}></div>
                           <div className="text-white font-medium">{event.status}</div>
                           <div className="text-white/50 text-sm mt-1">{new Date(event.timestamp).toLocaleString()}</div>
                        </div>
                     ))}
                  </div>
               </GlassCard>
            </div>
         )}
      </div>
    </div>
  );
}
