import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Package, Clock, CheckCircle, User, Phone, MapPin, Trash2, Lock, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminDashboard: React.FC = () => {
  const { orders, deleteOrder } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور خاطئة');
    }
  };

  if (!isAuthenticated) {
    return (
      <section id="admin" className="py-24 bg-[#050505]">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-[#111] p-8 rounded-3xl border border-white/5 text-center">
            <Lock size={48} className="mx-auto text-yellow-500 mb-6" />
            <h2 className="text-2xl font-black text-white mb-6">ADMIN ACCESS</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="password" 
                placeholder="Enter Password"
                className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-yellow-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="w-full py-4 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 transition-all">
                Login to Database
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-green-500" size={20} />
              <span className="text-green-500 text-xs font-bold tracking-widest uppercase">Admin Verified</span>
            </div>
            <h2 className="text-4xl font-black text-white">ORDER <span className="text-yellow-500">DATABASE</span></h2>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-gray-500 hover:text-white text-sm font-bold underline"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6">
          <AnimatePresence>
            {orders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#111] p-12 rounded-3xl text-center border border-white/5"
              >
                <Package size={48} className="mx-auto text-gray-700 mb-4" />
                <p className="text-gray-500">No orders found in the system.</p>
              </motion.div>
            ) : (
              orders.map((order) => (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[#111] p-8 rounded-3xl border border-white/5"
                >
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Order Info */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-yellow-500 text-black text-[10px] font-black rounded-full">#{order.id}</span>
                        <span className="text-gray-500 text-xs flex items-center gap-1"><Clock size={12} /> {order.date}</span>
                      </div>
                      <div className="space-y-2 border-l-2 border-yellow-500/20 pl-4">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-white text-sm">
                            <span className="text-yellow-500 font-bold">{item.quantity}x</span> {item.name}
                          </p>
                        ))}
                        <div className="pt-2">
                          <span className="text-2xl font-black text-white">{order.total} DZD</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-4 bg-black/30 p-4 rounded-2xl">
                      <div className="flex items-center gap-2 text-yellow-500 font-bold text-sm uppercase">
                        <User size={16} /> Customer Details
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-white font-bold">{order.customer.fullName}</p>
                        <p className="text-gray-400 flex items-center gap-2"><Phone size={14} /> {order.customer.phone}</p>
                        <p className="text-gray-400 flex items-center gap-2"><MapPin size={14} /> {order.customer.wilaya}</p>
                        <p className="text-gray-400 leading-relaxed">{order.customer.address}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col justify-between items-end">
                      <div className="flex items-center gap-2 text-green-500 text-sm font-bold px-4 py-2 bg-green-500/10 rounded-full">
                        <CheckCircle size={16} /> {order.status}
                      </div>
                      <button 
                        onClick={() => deleteOrder(order.id)}
                        className="text-red-500/50 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-full"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
