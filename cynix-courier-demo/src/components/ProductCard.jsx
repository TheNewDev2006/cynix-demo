import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { GlassCard } from './ui/GlassCard';
import { Button } from './ui/Button';
import { Droplets, Layers, Heart, Wind, Check, ShoppingBag, Plus, Minus } from 'lucide-react';

const categoryIcons = {
  'Soaps & Body Wash': Droplets,
  'Bath & Tissue': Layers,
  'Personal Care': Heart,
  'Laundry & Home': Wind
};

export function ProductCard({ product }) {
  const { cart, dispatch } = useContext(AppContext);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [showAdded, setShowAdded] = useState(false);

  // Check how many of this specific variant are already in the cart
  const cartItem = cart.find(item => item.productId === product.id && item.variant === selectedVariant);
  const qtyInCart = cartItem ? cartItem.quantity : 0;
  const isAdded = qtyInCart > 0;

  const Icon = categoryIcons[product.category] || ShoppingBag;
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        productId: product.id,
        name: product.name,
        variant: selectedVariant,
        price: product.price,
        image: product.image,
        quantity: 1
      }
    });
    
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1500);
  };

  const handleUpdateQty = (newQty) => {
    if (newQty < 1) {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: { productId: product.id, variant: selectedVariant }
      });
    } else if (newQty <= 99) {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { productId: product.id, variant: selectedVariant, quantity: newQty }
      });
    }
  };

  return (
    <GlassCard className="flex flex-col h-full overflow-hidden hover:-translate-y-1 transition-transform duration-300 relative group animate-on-scroll">
      {/* Image Area */}
      <div className="relative aspect-video sm:aspect-square bg-white/5 border-b border-white/10 overflow-hidden">
        {(!imgError && product.image) ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-500/10">
            <Icon className="w-16 h-16 text-brand-400 opacity-50" />
          </div>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 right-3 bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_0_12px_rgba(232,98,26,0.6)]">
            Featured
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-2 rounded-full font-semibold uppercase text-sm tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">
          {product.category}
        </div>
        <h3 className="text-lg font-semibold text-white leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-white/60 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Variant Selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            {product.variants.map(variant => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                className={`text-xs px-3 py-1 rounded-full transition-all border ${
                  selectedVariant === variant 
                    ? 'bg-brand-500 border-brand-400 text-white shadow-[0_0_8px_rgba(37,99,235,0.4)]'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {variant}
              </button>
            ))}
          </div>
        )}
        
        {/* If no variants, just push content down */}
        {(!product.variants || product.variants.length === 0) && (
          <div className="mt-auto"></div>
        )}

        {/* Price & Actions */}
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/10">
          <div>
            <div className="text-xl font-bold text-accent">
              ${product.price.toFixed(2)}
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-wider">
              per {product.unit}
            </div>
          </div>
          
          <div>
            {isAdded ? (
               <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-1 py-1">
                 <button 
                   onClick={() => handleUpdateQty(qtyInCart - 1)}
                   className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-colors"
                 >
                   <Minus className="w-4 h-4" />
                 </button>
                 <span className="w-6 text-center font-semibold text-white text-sm">
                   {qtyInCart}
                 </span>
                 <button 
                   onClick={() => handleUpdateQty(qtyInCart + 1)}
                   className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white transition-colors"
                 >
                   <Plus className="w-4 h-4" />
                 </button>
               </div>
            ) : showAdded ? (
               <div className="flex items-center justify-center h-10 px-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Check className="w-4 h-4 mr-2" /> Added!
               </div>
            ) : (
               <Button 
                 disabled={!product.inStock} 
                 onClick={handleAddToCart}
                 className="h-10 px-6 bg-accent hover:bg-accent/90 border-transparent shadow-[0_0_15px_rgba(232,98,26,0.3)] text-white font-medium"
               >
                 Add to Cart
               </Button>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
