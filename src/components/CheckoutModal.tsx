import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, MapPin, Home, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { CustomerInfo } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { placeOrder } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    wilaya: '',
    address: ''
  });

  const wilayas = [
    "1. أدرار", "2. الشلف", "3. الأغواط", "4. أم البواقي", "5. باتنة", "6. بجاية", "7. بسكرة", "8. بشار", "9. البليدة", "10. البويرة",
    "11. تمنراست", "12. تبسة", "13. تلمسان", "14. تيارت", "15. تيزي وزو", "16. الجزائر", "17. الجلفة", "18. جيجل", "19. سطيف", "20. سعيدة",
    "21. سكيكدة", "22. سيدي بلعباس", "23. عنابة", "24. قالمة", "25. قسنطينة", "26. المدية", "27. مستغانم", "28. المسيلة", "29. معسكر", "30. ورقلة",
    "31. وهران", "32. البيض", "33. إليزي", "34. برج بوعريريج", "35. بومرداس", "36. الطارف", "37. تندوف", "38. تيسمسيلت", "39. الوادي", "40. خنشلة",
    "41. سوق أهراس", "42. تيبازة", "43. ميلة", "44. عين الدفلى", "45. النعامة", "46. عين تموشنت", "47. غرداية", "48. غليزان", "49. تيميمون", "50. برج باجي مختار",
    "51. أولاد جلال", "52. بني عباس", "53. عين صالح", "54. عين قزام", "55. تقرت", "56. جانت", "57. المغير", "58. المنيعة", "59. آفلو", "60. بريكة",
    "61. القنطرة", "62. بير العاتر", "63. العريشة", "64. قصر الشلالة", "65. عين وسارة", "66. مسعد", "67. قصر البخاري", "68. بوسعادة", "69. الأبيض سيدي الشيخ"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.wilaya || !formData.address) {
      alert("الرجاء ملء جميع الحقول");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await placeOrder(formData);
      if (success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onSuccess();
          onClose();
        }, 2000);
      } else {
        alert("عذراً، حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.");
      }
    } catch (err) {
      alert("حدث خطأ غير متوقع.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!isSubmitting ? onClose : undefined}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#111] rounded-[2rem] border border-yellow-500/30 shadow-2xl overflow-hidden flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {isSuccess ? (
              <div className="p-16 text-center space-y-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg"
                >
                  <CheckCircle2 size={48} className="text-white" />
                </motion.div>
                <h2 className="text-3xl font-black text-white italic tracking-tighter">SUCCESS!</h2>
                <p className="text-gray-400">تم إرسال طلبك بنجاح. سنقوم بالاتصال بك قريباً.</p>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#151515]">
                  <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Delivery <span className="text-yellow-500">Details</span></h2>
                  <button onClick={onClose} disabled={isSubmitting} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white hover:bg-red-500 transition-all">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh]">
                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Full Name / الاسم واللقب</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500/50" size={18} />
                          <input
                            type="text"
                            placeholder="Ahmed Benali"
                            required
                            disabled={isSubmitting}
                            className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-yellow-500 outline-none transition-all disabled:opacity-50"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Phone Number / رقم الهاتف</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500/50" size={18} />
                          <input
                            type="tel"
                            placeholder="05XX XX XX XX"
                            required
                            disabled={isSubmitting}
                            className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-yellow-500 outline-none transition-all disabled:opacity-50"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Wilaya / الولاية</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500/50" size={18} />
                          <select
                            required
                            disabled={isSubmitting}
                            className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-10 text-white focus:border-yellow-500 outline-none transition-all appearance-none cursor-pointer disabled:opacity-50"
                            value={formData.wilaya}
                            onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
                          >
                            <option value="">Select Wilaya / اختر الولاية</option>
                            {wilayas.map((w) => (
                              <option key={w} value={w} className="bg-[#111]">{w}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Address / العنوان بالتفصيل</label>
                        <div className="relative">
                          <Home className="absolute left-4 top-4 text-yellow-500/50" size={18} />
                          <textarea
                            placeholder="Street, Building, Apartment No. / رقم الشارع، العمارة، الطابق"
                            required
                            disabled={isSubmitting}
                            rows={3}
                            className="w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-yellow-500 outline-none transition-all resize-none disabled:opacity-50"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 text-lg shadow-xl shadow-yellow-500/20 mt-4 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>CONFIRM ORDER <Send size={20} /></>
                      )}
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
