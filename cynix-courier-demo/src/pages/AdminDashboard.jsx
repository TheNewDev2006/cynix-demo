import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { GlassCard } from '../components/ui/GlassCard';
import { KPICard } from '../components/ui/KPICard';
import { StatusChip } from '../components/ui/StatusChip';
import { PackageDetailModal } from '../components/PackageDetailModal';
import { Package, CheckCircle, Truck, DollarSign, Search, Filter, ShoppingCart } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export function AdminDashboard() {
  const { packages, invoices, productOrders } = useContext(AppContext);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const totalPackages = packages.filter(p => new Date(p.timeline[0].timestamp).toDateString() === new Date().toDateString()).length;
  const inTransit = packages.filter(p => ['In Transit to Bahamas', 'Out for Delivery'].includes(p.status)).length;
  const pendingInvoices = invoices.filter(inv => inv.status === 'Unpaid').reduce((sum, inv) => sum + inv.amount, 0);
  const deliveredToday = packages.filter(p => p.status === 'Delivered' && new Date(p.timeline[p.timeline.length-1].timestamp).toDateString() === new Date().toDateString()).length;
  
  // Use mock total for product orders to ensure it shows up in demo
  const productOrdersCount = productOrders.length + 5; 

  // Pipeline Data
  const statuses = [
    'Received at US Warehouse', 'In Transit to Bahamas', 'Arrived at Bahamas Warehouse', 
    'Ready for Collection', 'Out for Delivery', 'Delivered', 'Failed Delivery'
  ];
  const pipelineData = statuses.map(s => ({
     name: s.split(' ')[0],
     fullName: s,
     count: packages.filter(p => p.status === s).length
  }));

  // Mock Revenue
  const revData = Array.from({length: 7}).map((_, i) => ({
     day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
     value: Math.floor(Math.random() * 2000) + 1000
  }));

  const filteredPackages = packages.filter(p => {
     const matchesSearch = 
        p.trackingNumber.toLowerCase().includes(search.toLowerCase()) || 
        p.customerId.toLowerCase().includes(search.toLowerCase()) ||
        p.status.toLowerCase().includes(search.toLowerCase());
     const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
     return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-white tracking-tight">Command Centre</h1>
           <p className="text-white/60 mt-1">Real-time overview of your logistics operation.</p>
        </div>
        <button onClick={() => window.print()} className="btn-secondary h-10 px-4">
           Print Daily Manifest
        </button>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-4 lg:grid lg:grid-cols-5 md:overflow-visible md:pb-0">
         <div className="min-w-[85vw] max-w-[350px] snap-center shrink-0 md:w-auto md:min-w-0 md:max-w-none">
            <KPICard title="Packages Today" value={totalPackages + 15} icon={Package} trend="12% vs yesterday" trendUp={true} accentColor="rgba(96, 165, 250, 0.4)" />
         </div>
         <div className="min-w-[85vw] max-w-[350px] snap-center shrink-0 md:w-auto md:min-w-0 md:max-w-none">
            <KPICard title="In Transit" value={inTransit} icon={Truck} trend="Stable" trendUp={true} accentColor="rgba(252, 211, 77, 0.4)" />
         </div>
         <div className="min-w-[85vw] max-w-[350px] snap-center shrink-0 md:w-auto md:min-w-0 md:max-w-none">
            <KPICard title="Pending Invoices" value={`$${pendingInvoices.toLocaleString(undefined, {minimumFractionDigits: 2})}`} icon={DollarSign} trend="Needs attention" trendUp={false} accentColor="rgba(248, 113, 113, 0.4)" />
         </div>
         <div className="min-w-[85vw] max-w-[350px] snap-center shrink-0 md:w-auto md:min-w-0 md:max-w-none">
            <KPICard title="Product Orders" value={productOrdersCount} icon={ShoppingCart} trend="New channel" trendUp={true} accentColor="rgba(232, 98, 26, 0.4)" />
         </div>
         <div className="min-w-[85vw] max-w-[350px] snap-center shrink-0 md:w-auto md:min-w-0 md:max-w-none">
            <KPICard title="Delivered Today" value={deliveredToday + 8} icon={CheckCircle} trend="5% vs yesterday" trendUp={true} accentColor="rgba(52, 211, 153, 0.4)" />
         </div>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 md:grid md:grid-cols-1 lg:grid-cols-3 md:overflow-visible md:pb-0">
         <div className="min-w-[85vw] snap-center shrink-0 md:w-auto md:min-w-0 lg:col-span-2">
            <GlassCard className="p-6 flex flex-col h-full">
               <h3 className="text-lg font-semibold text-white mb-6">Package Pipeline</h3>
               <div className="flex-1 min-h-[250px] w-full">
                  <ResponsiveContainer width="99%" height={250} minWidth={1} minHeight={1}>
                     <BarChart data={pipelineData}>
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                           contentStyle={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                           itemStyle={{ color: '#60A5FA' }}
                           labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
                           formatter={(value, name, props) => [value, props.payload.fullName]}
                        />
                        <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </GlassCard>
         </div>

         <div className="min-w-[85vw] snap-center shrink-0 md:w-auto md:min-w-0">
            <GlassCard className="p-6 flex flex-col h-full">
               <h3 className="text-lg font-semibold text-white mb-6">Revenue Trend</h3>
               <div className="flex-1 min-h-[250px] w-full">
                  <ResponsiveContainer width="99%" height={250} minWidth={1} minHeight={1}>
                     <AreaChart data={revData}>
                        <defs>
                           <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#34D399" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                           contentStyle={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                           itemStyle={{ color: '#34D399' }}
                           labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#34D399" fillOpacity={1} fill="url(#colorRev)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </GlassCard>
         </div>
      </div>

      <GlassCard className="p-0 overflow-hidden">
         <div className="p-6 border-b border-white/10 bg-white/5 space-y-4">
            <div className="flex justify-between items-center">
               <h3 className="text-lg font-semibold text-white">Recent Packages</h3>
               <div className="relative w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input 
                     type="text" 
                     placeholder="Search tracking, customer..." 
                     className="search-pill" 
                     value={search}
                     onChange={e => setSearch(e.target.value)}
                  />
               </div>
            </div>
            <div className="flex flex-wrap gap-2">
               {['All', ...statuses].map(s => (
                  <button
                     key={s}
                     onClick={() => setStatusFilter(s)}
                     className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        statusFilter === s 
                           ? 'bg-brand-500/30 text-brand-300 border border-brand-400/40 shadow-[0_0_10px_rgba(81,126,221,0.25)]' 
                           : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'
                     }`}
                  >
                     {s === 'All' ? 'All' : s}
                  </button>
               ))}
            </div>
         </div>
         <div className="overflow-x-auto">
            <div className="min-w-[800px]">
               <div className="glass-table-header">
                  <div>Tracking No.</div>
                  <div>Customer</div>
                  <div>Weight</div>
                  <div>Status</div>
                  <div>Value</div>
                  <div></div>
               </div>
               {filteredPackages.map(pkg => (
                  <div key={pkg.id} className="glass-table-row">
                     <div>
                        <span className="tracking-number inline-block">{pkg.trackingNumber}</span>
                     </div>
                     <div className="text-white text-sm truncate pr-4">{pkg.customerId}</div>
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
               {filteredPackages.length === 0 && (
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
