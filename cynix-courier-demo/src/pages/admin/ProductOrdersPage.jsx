import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Search, ShoppingCart, Filter } from 'lucide-react';

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'text-amber-400 bg-amber-500/20 border-amber-400/30';
    case 'Confirmed': return 'text-brand-400 bg-brand-500/20 border-brand-400/30';
    case 'Packed': return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
    case 'Out for Delivery': return 'text-blue-400 bg-blue-500/20 border-blue-400/30';
    case 'Delivered': return 'text-emerald-400 bg-emerald-500/20 border-emerald-400/30';
    default: return 'text-white/60 bg-white/10 border-white/20';
  }
};

export function ProductOrdersPage() {
  const { productOrders, dispatch } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = productOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId, newStatus, customerName) => {
    dispatch({ 
      type: 'UPDATE_PRODUCT_ORDER_STATUS', 
      payload: { orderId, status: newStatus } 
    });
    
    dispatch({ 
      type: 'SIMULATE_NOTIFICATION', 
      payload: {
        type: 'WhatsApp',
        message: `Hi ${customerName.split(' ')[0]}! 👋 Your Fairlady order ${orderId} is now ${newStatus}.`,
        timestamp: new Date().toISOString()
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Product Orders</h1>
          <p className="text-white/60 mt-1">Manage e-commerce orders for Fairlady products.</p>
        </div>
      </div>

      <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between border-white/10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by order # or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-400 focus:bg-white/10 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-white/40 hidden md:block" />
          <div className="relative w-full md:w-48">
             <select
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-brand-400 cursor-pointer"
             >
               <option value="All" className="bg-slate-800">All Statuses</option>
               {ORDER_STATUSES.map(s => <option key={s} value={s} className="bg-slate-800">{s}</option>)}
             </select>
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
               <div className="w-2 h-2 border-b-2 border-r-2 border-white/40 rotate-45"></div>
             </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="overflow-hidden border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Order #</th>
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Customer</th>
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Items</th>
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Total (BSD)</th>
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Address</th>
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase">Status</th>
                <th className="p-4 text-xs font-semibold text-white/50 tracking-wider uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                 <tr>
                    <td colSpan="7" className="p-12 text-center text-white/50">
                       <ShoppingCart className="w-12 h-12 mx-auto text-white/20 mb-3" />
                       No product orders found.
                    </td>
                 </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="font-mono text-sm text-white font-medium">{order.id}</div>
                      <div className="text-[10px] text-white/40">{new Date(order.date).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-white">{order.customerName}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-white/80">{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-bold text-accent">${order.totalAmount.toFixed(2)}</div>
                      <div className="text-[10px] text-white/40">COD</div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs text-white/70 max-w-[150px] truncate" title={`${order.address.street}, ${order.address.area}`}>
                        {order.address.street}, {order.address.area}
                      </div>
                      <div className="text-[10px] text-white/40">{order.address.island}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                       <div className="relative inline-block w-36">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value, order.customerName)}
                            className="w-full appearance-none bg-white/5 border border-white/10 hover:bg-white/10 rounded-full py-1.5 pl-3 pr-8 text-xs text-white focus:outline-none focus:border-brand-400 cursor-pointer transition-all"
                          >
                            {ORDER_STATUSES.map(s => <option key={s} value={s} className="bg-slate-800">{s}</option>)}
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="w-1.5 h-1.5 border-b border-r border-white/60 rotate-45"></div>
                          </div>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
