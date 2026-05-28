import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Button } from './ui/Button';
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react';

export function CartDrawer({ isOpen, onClose }) {
  const { cart, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const updateQty = (productId, variant, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, variant } });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, variant, quantity: newQty } });
    }
  };

  const removeItem = (productId, variant) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, variant } });
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    onClose();
    navigate('/customer/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className="fixed top-0 right-0 h-full w-full md:w-[400px] z-[60] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(40px)',
          borderLeft: '1px solid rgba(255,255,255,0.15)',
          borderTopLeftRadius: '32px',
          borderBottomLeftRadius: '32px'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                <ShoppingBag className="w-5 h-5" />
             </div>
             <div>
               <h2 className="text-xl font-bold text-white leading-tight">Your Cart</h2>
               <p className="text-xs text-white/50">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
              <ShoppingBag className="w-16 h-16 text-white/30" />
              <div>
                <p className="text-white font-medium mb-1">Your cart is empty</p>
                <p className="text-sm text-white/50">Looks like you haven't added anything yet.</p>
              </div>
              <Button variant="secondary" onClick={() => { onClose(); navigate('/customer/products'); }}>
                Browse Products
              </Button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.productId}-${item.variant}-${idx}`} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 relative group">
                 {/* Item Image */}
                 <div className="w-20 h-20 rounded-xl bg-black/20 overflow-hidden shrink-0 border border-white/10">
                    {item.image ? (
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="w-6 h-6 text-white/20" /></div>
                    )}
                 </div>
                 
                 {/* Item Details */}
                 <div className="flex-1 flex flex-col justify-between">
                    <div className="pr-6">
                       <h4 className="text-sm font-semibold text-white leading-tight line-clamp-1">{item.name}</h4>
                       {item.variant && <p className="text-xs text-brand-300 mt-1">{item.variant}</p>}
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                       <div className="text-sm font-bold text-accent">${item.price.toFixed(2)}</div>
                       
                       {/* Qty Stepper */}
                       <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-1 py-1">
                         <button 
                           onClick={() => updateQty(item.productId, item.variant, item.quantity, -1)}
                           className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-colors"
                         >
                           <Minus className="w-3 h-3" />
                         </button>
                         <span className="w-4 text-center font-semibold text-white text-xs">
                           {item.quantity}
                         </span>
                         <button 
                           onClick={() => updateQty(item.productId, item.variant, item.quantity, 1)}
                           className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-colors"
                         >
                           <Plus className="w-3 h-3" />
                         </button>
                       </div>
                    </div>
                 </div>

                 {/* Remove Button */}
                 <button 
                   onClick={() => removeItem(item.productId, item.variant)}
                   className="absolute top-4 right-4 text-white/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                 >
                   <Trash2 className="w-4 h-4" />
                 </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-white/5 shrink-0 space-y-4">
             <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70">
                   <span>Subtotal</span>
                   <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/70">
                   <span>Delivery (COD)</span>
                   <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10 mt-2">
                   <span>Total</span>
                   <span className="text-accent">${total.toFixed(2)}</span>
                </div>
             </div>
             
             <div className="space-y-3 pt-2">
               <Button 
                 className="w-full h-12 bg-accent hover:bg-accent/90 text-white shadow-[0_0_15px_rgba(232,98,26,0.3)] border-transparent"
                 onClick={handleCheckout}
               >
                 <ShoppingBag className="w-4 h-4 mr-2" /> Proceed to Checkout
               </Button>
               <Button variant="secondary" className="w-full h-12" onClick={onClose}>
                 Continue Shopping
               </Button>
             </div>
          </div>
        )}
      </div>
    </>
  );
}
