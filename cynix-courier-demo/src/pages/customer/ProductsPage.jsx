import React, { useState, useEffect } from 'react';
import { products } from '../../data/products';
import { ProductCard } from '../../components/ProductCard';
import { Button } from '../../components/ui/Button';
import { GlassCard } from '../../components/ui/GlassCard';
import { Search, ShoppingBag } from 'lucide-react';

const CATEGORIES = ['All', 'Soaps & Body Wash', 'Bath & Tissue', 'Personal Care', 'Laundry & Home'];
const SORTS = ['Featured', 'Price: Low → High', 'Price: High → Low', 'Name A–Z'];

export function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSort, setActiveSort] = useState('Featured');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let result = products;

    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Filter by Search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (activeSort === 'Price: Low → High') return a.price - b.price;
      if (activeSort === 'Price: High → Low') return b.price - a.price;
      if (activeSort === 'Name A–Z') return a.name.localeCompare(b.name);
      // Default: Featured
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    setFilteredProducts(result);
  }, [searchQuery, activeCategory, activeSort]);

  // Stagger animation on mount for grid items
  useEffect(() => {
    const cards = document.querySelectorAll('.animate-on-scroll');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 60}ms`;
      card.classList.add('animate-in', 'fade-in', 'slide-in-from-bottom-4');
    });
  }, [filteredProducts]);

  const featuredProducts = filteredProducts.filter(p => p.featured);
  const showFeaturedSection = activeCategory === 'All' && searchQuery === '' && activeSort === 'Featured' && featuredProducts.length > 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Our Products</h1>
        <p className="text-white/60">Fresh from Fairlady — delivered to your door.</p>
      </div>

      {/* Filter & Search Bar */}
      <GlassCard className="p-4 flex flex-col lg:flex-row gap-4 items-center justify-between border-white/10 relative z-20">
        
        {/* Search */}
        <div className="relative w-full lg:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-400 focus:bg-white/10 transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar mask-edges">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-all border ${
                activeCategory === cat
                  ? 'bg-brand-500 border-brand-400 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="w-full lg:w-auto shrink-0 relative group">
           <select 
             value={activeSort}
             onChange={(e) => setActiveSort(e.target.value)}
             className="w-full appearance-none bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-brand-400 cursor-pointer"
           >
             {SORTS.map(sort => <option key={sort} value={sort} className="bg-slate-800">{sort}</option>)}
           </select>
           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
             <div className="w-2 h-2 border-b-2 border-r-2 border-white/40 rotate-45"></div>
           </div>
        </div>
      </GlassCard>

      {/* Featured Products Row */}
      {showFeaturedSection && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-accent uppercase tracking-widest">✨ Featured</span>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar snap-x snap-mandatory mask-edges">
            {featuredProducts.map(product => (
              <div key={product.id} className="min-w-[280px] max-w-[320px] snap-start shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Product Grid */}
      <section className="space-y-4">
        {!showFeaturedSection && (
           <div className="text-sm font-medium text-white/50 mb-4">
             {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
           </div>
        )}
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <GlassCard className="p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-white/20">
             <ShoppingBag className="w-12 h-12 text-white/20" />
             <div>
               <h3 className="text-lg font-bold text-white mb-1">No products found</h3>
               <p className="text-white/50 text-sm">Try a different search term or category.</p>
             </div>
             <Button variant="secondary" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}>
               Clear Filters
             </Button>
          </GlassCard>
        )}
      </section>

    </div>
  );
}
