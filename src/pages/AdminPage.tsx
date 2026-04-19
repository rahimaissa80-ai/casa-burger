import { useState } from 'react';
import { useCart, Product } from '../context/CartContext';
import { Package, Clock, CheckCircle, User, Phone, MapPin, Trash2, Lock, ArrowLeft, Loader2, Plus, Edit, X, Save, LayoutDashboard, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const AdminPage = () => {
  const { orders, deleteOrder, isSyncing, products, addProduct, updateProduct, deleteProduct } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  
  // Product Form State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: 0,
    desc: '',
    img: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('كلمة المرور خاطئة');
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await updateProduct(editingProduct.id, productForm);
    } else {
      await addProduct(productForm);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
    setProductForm({ name: '', price: 0, desc: '', img: '' });
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      desc: product.desc,
      img: product.img
    });
    setIsProductModalOpen(true);
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
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-500 text-[10px] font-black tracking-[0.3em] uppercase">Firebase Realtime Sync</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">Casa <span className="text-yellow-500">Dashboard</span></h1>
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

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${activeTab === 'orders' ? 'bg-yellow-500 text-black' : 'bg-[#111] text-gray-500 hover:text-white'}`}
          >
            <LayoutDashboard size={20} /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${activeTab === 'products' ? 'bg-yellow-500 text-black' : 'bg-[#111] text-gray-500 hover:text-white'}`}
          >
            <ShoppingBag size={20} /> Products
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
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
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">Manage <span className="text-yellow-500">Products</span></h2>
              <button 
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({ name: '', price: 0, desc: '', img: '' });
                  setIsProductModalOpen(true);
                }}
                className="flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/20"
              >
                <Plus size={18} /> Add New Product
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {products.map((product) => (
                  <motion.div 
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-[#111] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-yellow-500/20 transition-all group"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-yellow-500 font-black text-sm">
                        {product.price} DZD
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{product.desc}</p>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => openEditModal(product)}
                          className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all border border-white/5"
                        >
                          <Edit size={16} /> Edit
                        </button>
                        <button 
                          onClick={() => {
                            if(confirm('Delete this product?')) deleteProduct(product.id)
                          }}
                          className="px-6 py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/10"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Product Modal */}
        <AnimatePresence>
          {isProductModalOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsProductModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-[#111] rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                      {editingProduct ? 'Edit' : 'Add'} <span className="text-yellow-500">Product</span>
                    </h2>
                    <button onClick={() => setIsProductModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                      <X size={32} />
                    </button>
                  </div>

                  <form onSubmit={handleProductSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Product Name</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-yellow-500 outline-none transition-all"
                          value={productForm.name}
                          onChange={e => setProductForm({...productForm, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Price (DZD)</label>
                        <input 
                          type="number" 
                          required
                          className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-yellow-500 outline-none transition-all"
                          value={productForm.price}
                          onChange={e => setProductForm({...productForm, price: Number(e.target.value)})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Image URL</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. /burger-name.jpg or https://..."
                        className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-yellow-500 outline-none transition-all"
                        value={productForm.img}
                        onChange={e => setProductForm({...productForm, img: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Description</label>
                      <textarea 
                        required
                        rows={4}
                        className="w-full bg-black border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-yellow-500 outline-none transition-all resize-none"
                        value={productForm.desc}
                        onChange={e => setProductForm({...productForm, desc: e.target.value})}
                      />
                    </div>

                    <button className="w-full py-6 bg-yellow-500 text-black font-black rounded-2xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-3 shadow-xl shadow-yellow-500/20">
                      <Save size={20} /> SAVE PRODUCT DATA
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
