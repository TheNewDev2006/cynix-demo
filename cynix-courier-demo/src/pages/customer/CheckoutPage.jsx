import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { MapPin, Phone, User, ShoppingBag, Loader2, ArrowLeft } from 'lucide-react';

const ISLANDS = ['New Providence', 'Grand Bahama', 'Abaco', 'Eleuthera', 'Exuma', 'Other'];

export function CheckoutPage() {
  const { cart, currentUser, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  // If cart is empty and not completed, redirect back to products
  useEffect(() => {
    if (cart.length === 0 && !isCompleted) {
      navigate('/customer/products');
    }
  }, [cart, navigate]);

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    phone: '242-555-0199', // mock default
    street: '',
    area: '',
    island: 'New Providence',
    instructions: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.street.trim()) newErrors.street = 'Street Address is required';
    if (!formData.area.trim()) newErrors.area = 'Area/District is required';
    if (!formData.island) newErrors.island = 'Island is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      const newOrderId = `FLI-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;
      setOrderId(newOrderId);
      
      const newOrder = {
        id: newOrderId,
        customerName: formData.fullName,
        items: [...cart],
        totalAmount: total,
        deliveryFee: deliveryFee,
        date: new Date().toISOString(),
        status: 'Pending',
        paymentMethod: 'Cash on Delivery',
        address: {
          street: formData.street,
          area: formData.area,
          island: formData.island
        }
      };

      dispatch({ type: 'PLACE_PRODUCT_ORDER', payload: newOrder });
      
      // Trigger WA Notification
      dispatch({ 
        type: 'SIMULATE_NOTIFICATION', 
        payload: {
          type: 'WhatsApp',
          message: `Hi ${formData.fullName.split(' ')[0]}! 👋 Your Fairlady order ${newOrderId} has been received. We'll contact you shortly to arrange delivery. Total due on arrival: $${total.toFixed(2)} BSD. — Fairlady Imports`,
          timestamp: new Date().toISOString()
        }
      });

      setIsSubmitting(false);
      setIsCompleted(true);
    }, 1500);
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500 pt-12 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.3)] relative">
           <svg className="w-12 h-12 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
             <path className="animate-[checkDraw_0.6s_ease-out_forwards]" strokeDasharray="100" strokeDashoffset="100" d="M20 6L9 17l-5-5" />
           </svg>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gradient leading-tight">Order Placed Successfully!</h1>
          <div className="inline-block bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white font-mono text-sm tracking-widest mt-2">
             Order #{orderId}
          </div>
        </div>

        <p className="text-white/80 text-lg max-w-lg mx-auto">
          Thank you, {formData.fullName.split(' ')[0]}! Your order has been received. A Fairlady team member will contact you to confirm delivery. Payment is due on arrival.
        </p>

        <GlassCard className="p-6 text-left max-w-md mx-auto border-dashed border-white/20">
          <h3 className="font-bold text-white mb-4 uppercase text-sm tracking-widest">What Happens Next</h3>
          <ul className="space-y-4">
             <li className="flex gap-3 text-white/80"><span className="w-6 h-6 rounded-full bg-brand-500/30 flex items-center justify-center shrink-0 text-xs font-bold text-brand-300">1</span> Order confirmed via WhatsApp</li>
             <li className="flex gap-3 text-white/80"><span className="w-6 h-6 rounded-full bg-brand-500/30 flex items-center justify-center shrink-0 text-xs font-bold text-brand-300">2</span> Items packed & dispatched</li>
             <li className="flex gap-3 text-white/80"><span className="w-6 h-6 rounded-full bg-brand-500/30 flex items-center justify-center shrink-0 text-xs font-bold text-brand-300">3</span> Driver delivers to your address</li>
             <li className="flex gap-3 text-white/80"><span className="w-6 h-6 rounded-full bg-brand-500/30 flex items-center justify-center shrink-0 text-xs font-bold text-brand-300">4</span> Pay driver on arrival (cash)</li>
          </ul>
        </GlassCard>

        <div className="flex justify-center gap-4 pt-4">
          <Button onClick={() => navigate('/customer/products')}>
            <ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping
          </Button>
          <Button variant="secondary" onClick={() => navigate('/customer/orders')}>
            My Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
      <div className="mb-8">
         <button onClick={() => navigate('/customer/products')} className="flex items-center text-white/50 hover:text-white transition-colors text-sm mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Products
         </button>
         <h1 className="text-3xl font-bold text-white tracking-tight">Checkout</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6">Delivery Details</h2>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`glass-input w-full ${errors.fullName ? 'border-red-400/50 shadow-[0_0_10px_rgba(248,113,113,0.2)]' : ''}`}
                    placeholder="Jane Doe"
                  />
                  {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                </div>
                
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`glass-input w-full ${errors.phone ? 'border-red-400/50 shadow-[0_0_10px_rgba(248,113,113,0.2)]' : ''}`}
                    placeholder="242-555-0199"
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>

                {/* Street Address */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className={`glass-input w-full ${errors.street ? 'border-red-400/50 shadow-[0_0_10px_rgba(248,113,113,0.2)]' : ''}`}
                    placeholder="123 Palm Tree Lane, Apt 4B"
                  />
                  {errors.street && <p className="text-xs text-red-400 mt-1">{errors.street}</p>}
                </div>

                {/* Area / District */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white/70">Area / District</label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className={`glass-input w-full ${errors.area ? 'border-red-400/50 shadow-[0_0_10px_rgba(248,113,113,0.2)]' : ''}`}
                    placeholder="Cable Beach"
                  />
                  {errors.area && <p className="text-xs text-red-400 mt-1">{errors.area}</p>}
                </div>

                {/* Island */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white/70">Island</label>
                  <div className="relative">
                     <select
                       name="island"
                       value={formData.island}
                       onChange={handleChange}
                       className={`glass-input w-full appearance-none cursor-pointer ${errors.island ? 'border-red-400/50' : ''}`}
                     >
                       {ISLANDS.map(island => <option key={island} value={island} className="bg-slate-800">{island}</option>)}
                     </select>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                       <div className="w-2 h-2 border-b-2 border-r-2 border-white/40 rotate-45"></div>
                     </div>
                  </div>
                  {errors.island && <p className="text-xs text-red-400 mt-1">{errors.island}</p>}
                </div>

                {/* Delivery Instructions */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                     Delivery Instructions <span className="text-xs text-white/30 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    rows="2"
                    className="glass-input w-full resize-none"
                    placeholder="Leave at door, call on arrival..."
                  ></textarea>
                </div>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="p-6 md:p-8 bg-brand-900/20">
             <h2 className="text-lg font-bold text-white mb-4">Payment Method</h2>
             <div className="flex items-center gap-4 bg-brand-500/20 border border-brand-400 p-4 rounded-xl shadow-[0_0_15px_rgba(27,48,112,0.4)]">
                <div className="w-6 h-6 rounded-full bg-brand-400 flex items-center justify-center shrink-0">
                   <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                   <div className="font-bold text-white">💵 Cash on Delivery</div>
                   <div className="text-sm text-brand-200 mt-1">Pay in cash when your order arrives. No card required.</div>
                </div>
             </div>
          </GlassCard>
          
          {/* Mobile Place Order Button */}
          <div className="lg:hidden">
             <Button 
               form="checkout-form"
               type="submit"
               disabled={isSubmitting}
               className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-[0_0_20px_rgba(232,98,26,0.4)]"
             >
               {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Place Order →'}
             </Button>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:sticky lg:top-24 space-y-6">
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white line-clamp-1">{item.name}</div>
                    <div className="text-xs text-white/50">{item.variant ? `${item.variant} · ` : ''}Qty: {item.quantity}</div>
                  </div>
                  <div className="text-sm font-semibold text-white/90 shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Cash on Delivery</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-3 border-t border-white/10 mt-2">
                <span>Total</span>
                <span className="text-accent">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
               {/* Desktop Place Order Button */}
               <div className="hidden lg:block">
                 <Button 
                   form="checkout-form"
                   type="submit"
                   disabled={isSubmitting}
                   className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-[0_0_20px_rgba(232,98,26,0.4)] transition-all"
                 >
                   {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Place Order →'}
                 </Button>
               </div>
               
               <Button variant="secondary" className="w-full" onClick={() => navigate('/customer/products')}>
                 <ShoppingBag className="w-4 h-4 mr-2" /> Edit Cart
               </Button>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
