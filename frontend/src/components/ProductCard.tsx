import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCartStore } from '../store/useCartStore';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const additem = useCartStore((state) => state.additem);

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <Link 
        to={`/product/${product.id}`} 
        className="relative aspect-square bg-[#0c1c30] border-b-[30px] border-[#99e2b4] overflow-hidden"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-500" 
        />
        {!product.inStock && (
          <span className="absolute top-4 right-4 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold">Upcoming</span>
        )}
      </Link>
      
      <div className="p-5 text-center flex-1 flex flex-col">
        <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest mb-1">{product.category}</span>
        <h3 className="text-gray-900 font-semibold mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-lg font-bold text-gray-800 mb-4">
          <span className="text-xs text-gray-400 mr-1">BDT</span>
          {product.price.toLocaleString()}
        </p>
        
        <button 
          onClick={() => additem(product)}
          className="mt-auto w-full py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};