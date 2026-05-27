import React from 'react';
import { StatusChip } from './ui/StatusChip';
import { X, Package, DollarSign, Scale, Hash } from 'lucide-react';

export function PackageDetailModal({ pkg, onClose }) {
  if (!pkg) return null;

  return (
    <div className="modal-backdrop flex items-center justify-center p-4">
      <div className="modal-panel w-full max-w-2xl relative max-h-[90vh] flex flex-col">
         <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <X className="w-6 h-6" />
         </button>
         
         <div className="flex items-center gap-4 mb-8 pr-12">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.3)]">
               <Package className="w-6 h-6 text-blue-400" />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-white tracking-tight">{pkg.trackingNumber}</h2>
               <p className="text-white/60 text-sm mt-1">Customer: {pkg.customerId} | Ext: {pkg.externalTracking}</p>
            </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
               <div className="text-white/50 text-xs flex items-center gap-1 mb-2 uppercase tracking-wider font-semibold"><Scale className="w-3 h-3"/> Weight</div>
               <div className="text-white font-medium">{pkg.weight} kg</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
               <div className="text-white/50 text-xs flex items-center gap-1 mb-2 uppercase tracking-wider font-semibold"><Hash className="w-3 h-3"/> Dims</div>
               <div className="text-white font-medium">{pkg.dimensions}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
               <div className="text-white/50 text-xs flex items-center gap-1 mb-2 uppercase tracking-wider font-semibold"><DollarSign className="w-3 h-3"/> Value</div>
               <div className="text-white font-medium">${pkg.value}</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
               <div className="text-white/50 text-xs flex items-center gap-1 mb-2 uppercase tracking-wider font-semibold">Status</div>
               <StatusChip status={pkg.status} />
            </div>
         </div>

         <div className="flex-1 overflow-y-auto pr-2">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 pb-2 border-b border-white/10">Tracking History</h3>
            <div className="relative pl-6 border-l-2 border-white/10 space-y-8 pb-4 ml-2">
               {[...pkg.timeline].reverse().map((event, idx) => (
                  <div key={idx} className="relative">
                     <div className={`absolute -left-[33px] w-4 h-4 rounded-full border-4 border-[rgba(15,23,42,1)] ${idx === 0 ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]' : 'bg-white/40'}`}></div>
                     <div className={idx === 0 ? "text-white font-bold" : "text-white/80 font-medium"}>{event.status}</div>
                     <div className="text-white/50 text-sm mt-1">{new Date(event.timestamp).toLocaleString()}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
