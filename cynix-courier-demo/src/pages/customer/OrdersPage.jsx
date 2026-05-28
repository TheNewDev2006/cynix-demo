import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Package, ChevronDown, ChevronUp, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const ORDER_STATUSES = ['Pending', 'Confirmed', 'Packed', 'Out for Delivery', 'Delivered'];

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending': return 'text-amber-400 bg-amber-500/20 border-amber-400/30 shadow-[0_0_10px_rgba(251,191,36,0.3)]';
    case 'Confirmed': return 'text-brand-400 bg-brand-500/20 border-brand-400/30 shadow-[0_0_10px_rgba(37,99,235,0.3)]';
    case 'Packed': return 'text-purple-400 bg-purple-500/20 border-purple-400/30 shadow-[0_0_10px_rgba(168,85,247,0.3)]';
    case 'Out for Delivery': return 'text-blue-400 bg-blue-500/20 border-blue-400/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]';
    case 'Delivered': return 'text-emerald-400 bg-emerald-500/20 border-emerald-400/30 shadow-[0_0_10px_rgba(52,211,153,0.3)]';
    default: return 'text-white/60 bg-white/10 border-white/20';
  }
};

const getStatusIndex = (status) => {
  return ORDER_STATUSES.indexOf(status);
};

export function OrdersPage() {
  const { productOrders, currentUser } = useContext(AppContext);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Filter orders for the current user
  const myOrders = productOrders.filter(order => order.customerName === currentUser?.name);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">My Product Orders</h1>
        <p className="text-white/60">View and track your Fairlady Imports purchases.</p>
      </div>

      <div className="space-y-4">
        {myOrders.length === 0 ? (
          <GlassCard className="p-12 text-center space-y-4 border-dashed border-white/20">
            <Package className="w-12 h-12 text-white/20 mx-auto" />
            <div>
              <h3 className="text-lg font-bold text-white mb-1">No orders yet</h3>
              <p className="text-white/50 text-sm">You haven't placed any product orders.</p>
            </div>
          </GlassCard>
        ) : (
          myOrders.map(order => {
            const isExpanded = expandedOrder === order.id;
            const statusIdx = getStatusIndex(order.status);

            return (
              <GlassCard key={order.id} className="overflow-hidden transition-all duration-300">
                {/* Header / Summary Row */}
                <div 
                  className="p-6 cursor-pointer hover:bg-white/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  onClick={() => toggleOrder(order.id)}
                >
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                         <Package className="w-6 h-6 text-white/60" />
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-white text-lg">{order.id}</h3>
                            <span className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                         </div>
                         <div className="flex items-center gap-4 text-sm text-white/50">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(order.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6 md:gap-8 border-t border-white/10 md:border-0 pt-4 md:pt-0">
                      <div className="text-left md:text-right">
                         <div className="text-sm text-white/50 mb-0.5">Total Amount</div>
                         <div className="font-bold text-accent text-lg">${order.totalAmount.toFixed(2)}</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50">
                         {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                   </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-6 border-t border-white/10 bg-black/20 space-y-8 animate-in slide-in-from-top-2 duration-300">
                     
                     {/* Timeline */}
                     <div className="pt-2 pb-6 px-4 md:px-8">
                        <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Order Status</h4>
                        <div className="relative">
                           <div className="absolute top-3 left-[5%] right-[5%] h-0.5 bg-white/10"></div>
                           <div 
                             className="absolute top-3 left-[5%] h-0.5 bg-brand-400 transition-all duration-700"
                             style={{ width: `${(Math.max(0, statusIdx) / (ORDER_STATUSES.length - 1)) * 90}%` }}
                           ></div>
                           
                           <div className="flex justify-between relative z-10">
                              {ORDER_STATUSES.map((step, idx) => {
                                 const isCompleted = idx <= statusIdx;
                                 const isCurrent = idx === statusIdx;
                                 
                                 return (
                                    <div key={step} className="flex flex-col items-center w-16 md:w-24">
                                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                          isCompleted 
                                             ? 'bg-brand-500 border-brand-400 text-white shadow-[0_0_10px_rgba(27,48,112,0.5)]' 
                                             : 'bg-slate-800 border-white/20'
                                       }`}>
                                          {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                                       </div>
                                       <span className={`text-[10px] md:text-xs font-semibold mt-2 text-center leading-tight ${isCurrent ? 'text-white' : 'text-white/40'}`}>
                                          {step}
                                       </span>
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-8">
                        {/* Items List */}
                        <div>
                           <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Items in Order</h4>
                           <div className="space-y-3">
                              {order.items.map((item, idx) => (
                                 <div key={idx} className="flex justify-between items-start p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div>
                                       <div className="font-semibold text-white text-sm">{item.name}</div>
                                       <div className="text-xs text-white/50">{item.variant ? `${item.variant} · ` : ''}Qty: {item.quantity}</div>
                                    </div>
                                    <div className="font-semibold text-white/90 text-sm">
                                       ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                 </div>
                              ))}
                              
                              <div className="pt-3 mt-3 border-t border-white/10 space-y-1">
                                 <div className="flex justify-between text-xs text-white/60">
                                    <span>Subtotal</span>
                                    <span>${(order.totalAmount - order.deliveryFee).toFixed(2)}</span>
                                 </div>
                                 <div className="flex justify-between text-xs text-white/60">
                                    <span>Delivery Fee (COD)</span>
                                    <span>${order.deliveryFee.toFixed(2)}</span>
                                 </div>
                                 <div className="flex justify-between font-bold text-white pt-2 mt-2 border-t border-white/10">
                                    <span>Total Amount</span>
                                    <span className="text-accent">${order.totalAmount.toFixed(2)}</span>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* Delivery & Payment Info */}
                        <div className="space-y-6">
                           <div>
                              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider flex items-center gap-2">
                                 <MapPin className="w-4 h-4 text-white/50" /> Delivery Address
                              </h4>
                              <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm text-white/80 leading-relaxed">
                                 {order.customerName}<br/>
                                 {order.address.street}<br/>
                                 {order.address.area}<br/>
                                 {order.address.island}, Bahamas
                              </div>
                           </div>
                           
                           <div>
                              <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Payment Method</h4>
                              <div className="p-3 bg-brand-500/10 border border-brand-500/30 rounded-xl inline-block text-brand-200 text-sm font-medium">
                                 💵 {order.paymentMethod}
                              </div>
                              {order.status === 'Delivered' ? (
                                 <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Paid on Delivery
                                 </p>
                              ) : (
                                 <p className="text-xs text-white/40 mt-2">
                                    Amount due to driver upon arrival.
                                 </p>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
                )}
              </GlassCard>
            );
          })
        )}
      </div>
    </div>
  );
}
