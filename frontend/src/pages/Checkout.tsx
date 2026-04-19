import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { ArrowLeft, Check, Truck, Shield, RotateCcw } from 'lucide-react';

export function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm p-10 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We will contact you to confirm within 24 hours.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-medium text-gray-900 mb-1">{form.name}</p>
            <p className="text-sm text-gray-500">{form.phone}</p>
            <p className="text-sm text-gray-500">{form.address}, {form.city}</p>
          </div>
          <div className="space-y-2 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Truck className="h-4 w-4 text-blue-600" /> Free next-day delivery
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <RotateCcw className="h-4 w-4 text-blue-600" /> 14-day free returns
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Shield className="h-4 w-4 text-blue-600" /> Cash on Delivery
            </div>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/shop" className="text-blue-600 hover:underline">Go to Shop</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          to="/shop"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          <ul className="space-y-4 mb-6">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover bg-gray-100" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-900">BDT {(item.price * item.quantity).toLocaleString()}</p>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-100 pt-4 flex justify-between">
            <p className="font-semibold text-gray-900">Total</p>
            <p className="font-bold text-gray-900">BDT {getCartTotal().toLocaleString()}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Details</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="01XXX-XXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="House/Flat, Road, Area"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City / District *</label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dhaka, Chittagong, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes (optional)</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                placeholder="Any special instructions..."
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Truck className="h-4 w-4 text-blue-600" /> Free next-day delivery
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <RotateCcw className="h-4 w-4 text-blue-600" /> 14-day free returns
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Shield className="h-4 w-4 text-blue-600" /> Cash on Delivery
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-xl transition-colors"
          >
            Place Order – Cash on Delivery
          </button>
        </form>
      </div>
    </div>
  );
}