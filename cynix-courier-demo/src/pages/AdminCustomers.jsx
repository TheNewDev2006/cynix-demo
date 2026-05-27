import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { GlassCard } from '../components/ui/GlassCard';
import { Users, Mail, Phone, Hash } from 'lucide-react';

export function AdminCustomers() {
  const { customers, packages } = useContext(AppContext);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
         <h1 className="text-3xl font-bold text-white tracking-tight">Customers</h1>
         <p className="text-white/60 mt-1">Manage customer accounts and mailboxes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {customers.map(customer => {
            const customerPackages = packages.filter(p => p.customerId === customer.id);
            return (
               <GlassCard key={customer.id} className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 font-bold text-lg shadow-[0_0_12px_rgba(37,99,235,0.2)]">
                        {customer.name.charAt(0)}
                     </div>
                     <div>
                        <h3 className="text-white font-semibold text-lg">{customer.name}</h3>
                        <p className="text-white/50 text-sm">{customer.id}</p>
                     </div>
                  </div>
                  <div className="space-y-3 mb-6">
                     <div className="flex items-center gap-3 text-sm text-white/70">
                        <Hash className="w-4 h-4 text-white/40" />
                        <span className="font-mono text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded">{customer.mailbox}</span>
                     </div>
                     <div className="flex items-center gap-3 text-sm text-white/70">
                        <Mail className="w-4 h-4 text-white/40" />
                        {customer.email}
                     </div>
                     <div className="flex items-center gap-3 text-sm text-white/70">
                        <Phone className="w-4 h-4 text-white/40" />
                        {customer.phone}
                     </div>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                     <div className="text-xs text-white/50">Total Packages</div>
                     <div className="text-sm font-bold text-white">{customerPackages.length}</div>
                  </div>
               </GlassCard>
            );
         })}
      </div>
    </div>
  );
}
