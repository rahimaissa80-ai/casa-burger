import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CheckoutModal } from './CheckoutModal';

export const CartOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  YOUR CART <ShoppingBag className="text-yellow-500" />
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                    <ShoppingBag size={64} strokeWidth={1} />
                    <p className="text-xl">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-white font-bold">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-yellow-500 text-sm font-bold mb-3">{item.price} DZD</p>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-white font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white hover:bg-yellow-500 hover:text-black transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400 font-medium">Total Amount</span>
                    <span className="text-3xl font-black text-white">{total} DZD</span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-2xl transition-all transform active:scale-95"
                  >
                    CONTINUE TO CHECKOUT
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        onSuccess={() => {
          onClose();
          alert('تم استلام طلبك بنجاح! شكراً لك.');
        }}
      />
    </>
  );
};
