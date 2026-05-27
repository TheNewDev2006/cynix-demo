import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { GlassCard } from '../components/ui/GlassCard';
import { StatusChip } from '../components/ui/StatusChip';
import { BarChart3, Package, Send } from 'lucide-react';
import { KPICard } from '../components/ui/KPICard';
import { PackageDetailModal } from '../components/PackageDetailModal';

export function StaffIntakeQueue() {
  const { packages, dispatch } = useContext(AppContext);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const receivedToday = packages.filter(p => p.status === 'Received at US Warehouse').length;
  const inTransit = packages.filter(p => p.status === 'In Transit to Bahamas').length;
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
         <h1 className="text-3xl font-bold text-white tracking-tight">Intake Queue</h1>
         <p className="text-white/60 mt-1">Overview of packages awaiting processing or transit.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <KPICard title="Received at Warehouse" value={receivedToday} icon={Package} accentColor="rgba(96, 165, 250, 0.4)" />
         <KPICard title="In Transit (Dispatched)" value={inTransit} icon={BarChart3} accentColor="rgba(192, 132, 252, 0.4)" />
      </div>

      <GlassCard className="p-0 overflow-hidden">
         <div className="p-6 border-b border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold text-white">Needs Action</h3>
         </div>
         <div className="overflow-x-auto">
            <div className="min-w-[800px]">
               <div className="glass-table-header">
                  <div>Tracking No.</div>
                  <div>Customer</div>
                  <div>Weight</div>
                  <div>Status</div>
                  <div>Value</div>
                  <div>Action</div>
               </div>
               {packages.filter(p => p.status === 'Received at US Warehouse').map(pkg => (
                  <div key={pkg.id} className="glass-table-row items-center">
                     <div>
                        <span className="tracking-number inline-block">{pkg.trackingNumber}</span>
                     </div>
                     <div className="text-white text-sm">{pkg.customerId}</div>
                     <div className="text-white/80 text-sm">{pkg.weight} kg</div>
                     <div><StatusChip status={pkg.status} /></div>
                     <div className="text-white/80 text-sm">${pkg.value}</div>
                     <div className="flex items-center gap-3">
                        <button 
                           onClick={() => dispatch({ type: 'UPDATE_PACKAGE_STATUS', payload: { packageId: pkg.id, status: 'In Transit to Bahamas' } })}
                           className="text-emerald-400 text-sm font-medium hover:text-emerald-300 flex items-center gap-1"
                           title="Dispatch to Bahamas"
                        >
                           <Send className="w-4 h-4" />
                        </button>
                        <div 
                           className="text-blue-400 text-sm font-medium hover:text-blue-300 cursor-pointer"
                           onClick={() => setSelectedPkg(pkg)}
                        >
                           View
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </GlassCard>

      {selectedPkg && (
         <PackageDetailModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
      )}
    </div>
  );
}
