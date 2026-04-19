import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Package, Clock, CheckCircle, User, Phone, MapPin, Trash2, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const AdminPage = () => {
  const { orders, deleteOrder, isSyncing } = useCart();
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
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#111] p-10 rounded-[2.5rem] border border-white/5 text-center shadow-2xl">
          <Lock size={48} className="mx-auto text-yellow-500 mb-6" />
          <h2 className="text-3xl font-black text-white mb-2 italic tracking-tighter">ADMIN <span className="text-yellow-500">LOGIN</span></h2>
          <p className="text-gray-500 text-sm mb-8 uppercase tracking-widest font-bold">Firebase Database Access</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Admin Password"
              className="w-full bg-black border border-white/10 rounded-2xl py-5 px-6 text-white focus:border-yellow-500 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button className="w-full py-5 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20">
              UNLOCK SYSTEM
            </button>
            <Link to="/" className="inline-block mt-6 text-gray-500 hover:text-white text-sm transition-colors">
              Back to Website
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-500 text-[10px] font-black tracking-[0.3em] uppercase">Firebase Realtime Sync</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">Order <span className="text-yellow-500">Database</span></h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl text-xs font-black uppercase tracking-widest border border-white/5">
              {isSyncing ? <Loader2 size={16} className="animate-spin text-yellow-500" /> : <div className="w-2 h-2 bg-green-500 rounded-full" />}
              {isSyncing ? "Syncing..." : "Live"}
            </div>
            <Link to="/" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/5">
              <ArrowLeft size={16} /> Website
            </Link>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-red-500/20"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {orders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#111] p-20 rounded-[3rem] text-center border border-dashed border-white/10"
              >
                <Package size={64} className="mx-auto text-gray-800 mb-6" />
                <p className="text-gray-500 text-xl font-bold">No orders in Firebase yet.</p>
              </motion.div>
            ) : (
              orders.map((order) => (
                <motion.div 
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#111] p-6 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-yellow-500/20 transition-all group shadow-xl"
                >
                  <div className="grid lg:grid-cols-3 gap-10">
                    {/* Column 1: Order Items */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-yellow-500 text-black text-[10px] font-black rounded-full">#{order.id.slice(0,6)}</span>
                        <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <Clock size={14} className="text-yellow-500" /> {order.date}
                        </span>
                      </div>
                      <div className="space-y-3 bg-black/40 p-6 rounded-2xl border border-white/5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-gray-300"><span className="text-yellow-500 font-black mr-2">{item.quantity}x</span> {item.name}</span>
                            <span className="text-white font-bold">{item.price * item.quantity} DZD</span>
                          </div>
                        ))}
                        <div className="pt-4 mt-4 border-t border-white/5 flex justify-between items-center">
                          <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total</span>
                          <span className="text-3xl font-black text-yellow-500">{order.total} DZD</span>
                        </div>
                      </div>
                    </div>

                    {/* Column 2: Customer Data */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-yellow-500 font-black text-[10px] uppercase tracking-[0.2em]">
                        <User size={14} /> Delivery Details
                      </div>
                      <div className="space-y-5 bg-black/40 p-6 rounded-2xl border border-white/5 h-full">
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Customer Name</p>
                          <p className="text-xl font-black text-white">{order.customer.fullName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Phone Number</p>
                          <p className="text-lg font-bold text-yellow-500 flex items-center gap-2">
                            <Phone size={16} /> {order.customer.phone}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Full Address</p>
                          <p className="text-sm text-gray-300 leading-relaxed flex items-start gap-2">
                            <MapPin size={16} className="shrink-0 mt-1 text-yellow-500" />
                            <span>
                              <span className="font-black text-white uppercase text-xs">{order.customer.wilaya}</span><br />
                              {order.customer.address}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Column 3: Status & Delete */}
                    <div className="flex flex-col justify-between items-end gap-6">
                      <div className="flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl">
                        <CheckCircle size={20} className="text-green-500" />
                        <span className="text-green-500 font-black text-[10px] uppercase tracking-[0.2em]">{order.status}</span>
                      </div>
                      
                      <button 
                        onClick={() => {
                          if(confirm('Are you sure you want to delete this order?')) deleteOrder(order.id)
                        }}
                        className="w-full lg:w-fit flex items-center justify-center gap-2 px-8 py-5 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border border-red-500/10 shadow-lg"
                      >
                        <Trash2 size={18} /> Delete Permanent
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
