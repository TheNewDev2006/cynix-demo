import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { GlassCard } from '../components/ui/GlassCard';
import { StatusChip } from '../components/ui/StatusChip';
import { Search } from 'lucide-react';
import { PackageDetailModal } from '../components/PackageDetailModal';

export function StaffWarehouse() {
  const { packages } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [selectedPkg, setSelectedPkg] = useState(null);

  const filtered = packages.filter(p => p.trackingNumber.toLowerCase().includes(search.toLowerCase()) || p.customerId.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
         <h1 className="text-3xl font-bold text-white tracking-tight">Warehouse Inventory</h1>
         <p className="text-white/60 mt-1">Search and view all packages in the logistics network.</p>
      </div>

      <GlassCard className="p-0 overflow-hidden">
         <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="relative w-64">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
               <input type="text" placeholder="Search tracking..." value={search} onChange={e => setSearch(e.target.value)} className="search-pill" />
            </div>
            <div className="text-white/60 text-sm">Showing {filtered.length} packages</div>
         </div>
         <div className="overflow-x-auto">
            <div className="min-w-[800px]">
               <div className="glass-table-header">
                  <div>Tracking No.</div>
                  <div>Customer</div>
                  <div>Weight</div>
                  <div>Location Status</div>
                  <div>Value</div>
                  <div>Action</div>
               </div>
               {filtered.map(pkg => (
                  <div key={pkg.id} className="glass-table-row items-center">
                     <div>
                        <span className="tracking-number inline-block">{pkg.trackingNumber}</span>
                     </div>
                     <div className="text-white text-sm">{pkg.customerId}</div>
                     <div className="text-white/80 text-sm">{pkg.weight} kg</div>
                     <div><StatusChip status={pkg.status} /></div>
                     <div className="text-white/80 text-sm">${pkg.value}</div>
                     <div 
                        className="text-brand-400 text-sm font-medium hover:text-brand-300 cursor-pointer"
                        onClick={() => setSelectedPkg(pkg)}
                     >
                        View
                     </div>
                  </div>
               ))}
               {filtered.length === 0 && (
                  <div className="p-8 text-center text-white/50">No packages found.</div>
               )}
            </div>
         </div>
      </GlassCard>

      {selectedPkg && (
         <PackageDetailModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
      )}
    </div>
  );
}
