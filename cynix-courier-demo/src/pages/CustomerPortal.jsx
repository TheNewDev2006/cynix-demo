import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { GlassCard } from '../components/ui/GlassCard';
import { KPICard } from '../components/ui/KPICard';
import { StatusChip } from '../components/ui/StatusChip';
import { PackageDetailModal } from '../components/PackageDetailModal';
import { Package, Clock, DollarSign, AlertTriangle, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CustomerPortal() {
  const { packages, invoices, currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedPkg, setSelectedPkg] = useState(null);
  
  // Hardcoded C001 for demo consistency as Trisha Williams
  const customerId = 'C001'; 
  const myPackages = packages.filter(p => p.customerId === customerId);
  const myInvoices = invoices.filter(inv => inv.customerId === customerId);

  const activePackages = myPackages.filter(p => p.status !== 'Delivered' && p.status !== 'Failed Delivery').length;
  const readyCollection = myPackages.filter(p => p.status === 'Ready for Collection').length;
  const outstandingBalance = myInvoices.filter(inv => inv.status === 'Unpaid').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, {currentUser?.name.split(' ')[0]}</h1>
           <p className="text-white/60 mt-1">Here is the status of your recent shipments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <KPICard title="Active Packages" value={activePackages} icon={Package} accentColor="rgba(96, 165, 250, 0.4)" />
         <KPICard title="Ready for Collection" value={readyCollection} icon={Clock} accentColor="rgba(192, 132, 252, 0.4)" />
         <KPICard title="Outstanding Balance" value={`$${outstandingBalance.toFixed(2)}`} icon={DollarSign} accentColor="rgba(248, 113, 113, 0.4)" />
      </div>

      <GlassCard className="p-0 overflow-hidden border-l-4 border-l-accent cursor-pointer group hover:-translate-y-1 transition-transform" onClick={() => navigate('/customer/products')}>
         <div className="p-6 flex flex-col sm:flex-row items-center gap-6 justify-between bg-white/5 group-hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0 border border-accent/30 shadow-[0_0_12px_rgba(232,98,26,0.2)]">
                  <ShoppingBag className="w-6 h-6 text-accent" />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-white">🛒 Shop Fairlady Products</h3>
                  <p className="text-sm text-white/70">Soaps, Bath Tissues & more, delivered to your door. Cash on Delivery.</p>
               </div>
            </div>
            <button className="shrink-0 h-10 px-6 rounded-full bg-accent text-white font-medium shadow-[0_0_15px_rgba(232,98,26,0.3)] hover:bg-accent/90 transition-colors">
               Shop Now →
            </button>
         </div>
      </GlassCard>

      <GlassCard className="p-0 overflow-hidden">
         <div className="p-6 border-b border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold text-white">My Shipments</h3>
         </div>
         <div className="overflow-x-auto">
            <div className="min-w-[800px]">
               <div className="glass-table-header">
                  <div>Tracking No.</div>
                  <div>Estimated Arrival</div>
                  <div>Weight</div>
                  <div>Status</div>
                  <div>Flags</div>
                  <div></div>
               </div>
               {myPackages.map(pkg => (
                  <div key={pkg.id} className="glass-table-row">
                     <div>
                        <span className="tracking-number inline-block">{pkg.trackingNumber}</span>
                     </div>
                     <div className="text-white text-sm">
                        {pkg.status === 'Delivered' ? 'Delivered' : '3-5 Days'}
                     </div>
                     <div className="text-white/80 text-sm">{pkg.weight} kg</div>
                     <div><StatusChip status={pkg.status} /></div>
                     <div>
                        {pkg.dutyFlag && (
                           <div className="flex items-center gap-1 text-orange-400 text-xs font-semibold bg-orange-400/10 px-2 py-1 rounded-full w-fit border border-orange-400/30">
                              <AlertTriangle className="w-3 h-3" /> Duty
                           </div>
                        )}
                     </div>
                     <div 
                        className="text-brand-400 text-sm font-medium hover:text-brand-300 cursor-pointer"
                        onClick={() => setSelectedPkg(pkg)}
                     >
                        Details
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
