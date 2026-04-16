import React, { useState } from 'react';
// Updated this line to import categories
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-white to-[#f0fff4] py-16 text-center">
        <h1 className="text-4xl font-bold text-[#2e7d32] mb-4 uppercase tracking-wide">Our Products</h1>
        <p className="text-green-700 max-w-xl mx-auto px-4">Reliable energy solutions for a safer future.</p>
      </div>

      <div className="container mx-auto px-4">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 my-10">
          <button 
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
              activeCategory === 'All' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-100'
            }`}
          >
            All Products
          </button>
          
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                activeCategory === cat 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;