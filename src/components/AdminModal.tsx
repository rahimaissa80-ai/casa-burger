import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Package, Clock, CheckCircle, User, Phone, MapPin, Trash2, Lock, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-10 bg-[#050505] z-[110] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-yellow-500" size={24} />
                <h2 className="text-xl font-black text-white tracking-tighter">ADMIN <span className="text-yellow-500">PANEL</span></h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              {!isAuthenticated ? (
                <div className="max-w-md mx-auto py-20 text-center">
                  <Lock size={48} className="mx-auto text-yellow-500 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-6">Restricted Access</h3>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                      type="password" 
                      placeholder="Enter Admin Password"
                      autoFocus
                      className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-yellow-500 outline-none transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full py-4 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/10">
                      Login to Database
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <p className="text-gray-400">Manage all incoming orders from the database.</p>
                    <button 
                      onClick={() => setIsAuthenticated(false)}
                      className="px-4 py-2 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      Logout Session
                    </button>
                  </div>

                  <div className="grid gap-6">
                    {orders.length === 0 ? (
                      <div className="bg-white/5 p-20 rounded-3xl text-center border border-dashed border-white/10">
                        <Package size={48} className="mx-auto text-gray-700 mb-4" />
                        <p className="text-gray-500">No orders found in the system.</p>
                      </div>
                    ) : (
                      orders.map((order) => (
                        <motion.div 
                          key={order.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-[#111] p-6 md:p-8 rounded-3xl border border-white/5 hover:border-yellow-500/20 transition-colors"
                        >
                          <div className="grid md:grid-cols-3 gap-8">
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-yellow-500 text-black text-[10px] font-black rounded-full">#{order.id}</span>
                                <span className="text-gray-500 text-[10px] flex items-center gap-1 uppercase tracking-widest font-bold"><Clock size={12} /> {order.date}</span>
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

                            <div className="space-y-4 bg-black/50 p-5 rounded-2xl border border-white/5">
                              <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs uppercase tracking-widest">
                                <User size={14} /> Customer Info
                              </div>
                              <div className="space-y-2 text-sm">
                                <p className="text-white font-bold">{order.customer.fullName}</p>
                                <p className="text-gray-400 flex items-center gap-2"><Phone size={14} className="text-yellow-500/50" /> {order.customer.phone}</p>
                                <p className="text-gray-400 flex items-center gap-2"><MapPin size={14} className="text-yellow-500/50" /> {order.customer.wilaya}</p>
                                <p className="text-gray-400 leading-relaxed text-xs">{order.customer.address}</p>
                              </div>
                            </div>

                            <div className="flex flex-col justify-between items-end">
                              <div className="flex items-center gap-2 text-green-500 text-[10px] font-black px-4 py-2 bg-green-500/10 rounded-full uppercase tracking-widest">
                                <CheckCircle size={14} /> {order.status}
                              </div>
                              <button 
                                onClick={() => deleteOrder(order.id)}
                                className="text-red-500/30 hover:text-red-500 transition-all p-3 hover:bg-red-500/10 rounded-2xl"
                                title="Delete Order"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
