import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Star, Menu as MenuIcon, X, ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from './context/CartContext';
import { CartOverlay } from './components/CartOverlay';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onOpenCart }: { onOpenCart: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed w-full z-[100] bg-black/80 backdrop-blur-md border-b border-yellow-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2 group">
            <img src="/logo.png" alt="Casa Burger Logo" className="h-14 w-14 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-2xl font-bold tracking-tighter text-white uppercase">CASA<span className="text-yellow-500">BURGER</span></span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest items-center">
            <a href="#home" className="text-white hover:text-yellow-500 transition-colors">Home</a>
            <a href="#about" className="text-white hover:text-yellow-500 transition-colors">About</a>
            <a href="#menu" className="text-white hover:text-yellow-500 transition-colors">Menu</a>
            <a href="#reviews" className="text-white hover:text-yellow-500 transition-colors">Reviews</a>
            <a href="#contact" className="text-white hover:text-yellow-500 transition-colors">Contact</a>
            
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-white hover:text-yellow-500 transition-colors cursor-pointer"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-white cursor-pointer"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white cursor-pointer">
              {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black border-b border-yellow-900/30 px-4 pt-2 pb-6 space-y-4"
        >
          <a href="#home" onClick={() => setIsMenuOpen(false)} className="block text-white text-lg font-bold">Home</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="block text-white text-lg font-bold">About</a>
          <a href="#menu" onClick={() => setIsMenuOpen(false)} className="block text-white text-lg font-bold">Menu</a>
          <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="block text-white text-lg font-bold">Reviews</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-white text-lg font-bold">Contact</a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="/hero-burger.jpg" 
        alt="Delicious Burger" 
        className="w-full h-full object-cover brightness-[0.4]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
    </div>
    
    <div className="relative z-10 text-center px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1 mb-6 border border-yellow-500 text-yellow-500 text-sm font-bold uppercase tracking-[0.3em] rounded-full bg-yellow-500/10">
          Baba Hassan, Algiers
        </span>
        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase">
          THE CRUNCHIEST <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">BURGER</span> IN TOWN
        </h1>
        <p className="text-gray-300 text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Experience the perfect blend of premium Algerian beef, secret spices, and the freshest ingredients.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#menu" className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer">
            Order Now <ChevronRight size={20} />
          </a>
          <a href="#contact" className="border border-white/30 hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer">
            <MapPin size={20} className="text-yellow-500" /> View Map
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-yellow-500 z-0"></div>
          <img src="/double-cheese.jpg" alt="Our Quality" className="rounded-2xl shadow-2xl relative z-10 grayscale-[0.2] hover:grayscale-0 transition-all duration-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase italic tracking-tighter">
            CRAFTING THE <span className="text-yellow-500">PERFECT</span> BITE
          </h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              Located in the heart of Baba Hassan, <span className="text-white font-semibold uppercase">Casa Burger</span> has become a local legend for those who crave the ultimate crunch.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500">
                  <Star fill="currentColor" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Premium Meat</h4>
                  <p className="text-sm">100% Halal Beef</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Fast Service</h4>
                  <p className="text-sm">Fresh & Hot</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Menu = () => {
  const { addToCart } = useCart();
  const items = [
    { 
      id: "b1", 
      name: "The Giant Casa Tower", 
      price: 1200, 
      desc: "Four juicy beef patties, quadruple cheese, and our signature crunch.", 
      img: "/giant-burger.jpg" 
    },
    { 
      id: "b2", 
      name: "Triple Beef Master", 
      price: 1050, 
      desc: "Three flame-grilled patties with melted cheddar and crispy onions.", 
      img: "/triple-burger.jpg" 
    },
    { 
      id: "b3", 
      name: "Gourmet Special", 
      price: 850, 
      desc: "Premium beef, fresh spinach, secret sauce, and artisanal brioche bun.", 
      img: "/special-burger.jpg" 
    },
    { 
      id: "b4", 
      name: "Classic Beef Crunch", 
      price: 750, 
      desc: "The original Casa favorite: juicy beef, cheddar, and the perfect crunch.", 
      img: "/beef-burger.jpg" 
    }
  ];

  return (
    <section id="menu" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 italic tracking-tighter uppercase">OUR MENU</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#111] rounded-3xl overflow-hidden group hover:ring-2 ring-yellow-500 transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  <span className="text-yellow-500 font-black whitespace-nowrap ml-2">{item.price} DZD</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed h-12 overflow-hidden">{item.desc}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-yellow-500 hover:text-black transition-colors text-sm uppercase tracking-widest cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => (
  <section id="reviews" className="py-24 bg-[#0a0a0a]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-black text-white mb-12 uppercase italic tracking-tighter">Customer Reviews</h2>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        {[
          { 
            name: "Meziti Sayfou", 
            text: "So I really recommend them! The burgers were very good and well-filled, just like on their website. The crispy burgers were a hit with the kids and us. Plus, there was a delivery delay, and without even complaining, we received a goodwill gesture. The phone service was very warm and friendly. May God bless you! Well done, and may God bless your business!", 
            stars: 5 
          },
          { 
            name: "Arezki Kh", 
            text: "Honestly, Casa Berger has become my go-to spot for a great burger without breaking the bank. I've been several times, and each time it's been a real treat. The meat is fresh, tender, well-seasoned, and cooked to perfection. The brioche bun is simply incredible: soft, light, with a touch of sweetness that makes all the difference. You can tell it's homemade, and that makes all the difference! The best part is the incredibly affordable prices: starting at 200 DA. The staff is super welcoming and friendly, and the service is fast, even during peak hours. Highly recommended!", 
            stars: 5 
          },
          { 
            name: "Taoues Fellahi", 
            text: "I assure you, this is the best burger I've eaten in Algiers, no exaggeration. Quality, quantity, price—mashallah, tabaraka arrahman! May God bless you, dear neighbors.", 
            stars: 5 
          }
        ].map((rev, i) => (
          <div key={i} className="bg-[#111] p-8 rounded-3xl border border-white/5 flex flex-col h-full">
            <div className="flex text-yellow-500 mb-4">
              {[...Array(rev.stars)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
            </div>
            <p className="text-gray-300 italic mb-6 flex-1 text-sm leading-relaxed">"{rev.text}"</p>
            <p className="text-white font-bold uppercase text-[10px] tracking-widest mt-auto border-t border-white/5 pt-4">{rev.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const address = "MXWG+GQ9, Baba Hassan, Algiers";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4">FIND <span className="text-yellow-500">US</span></h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 hover:border-yellow-500/20 transition-all shadow-xl">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center text-black shrink-0 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                  <MapPin size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-black text-xl mb-2 uppercase tracking-widest italic">Our Location</h4>
                  <p className="text-gray-400 text-lg leading-relaxed mb-4">{address}</p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Casa Burger Baba Hassan")}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-yellow-500 text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-yellow-400 transition-all flex items-center gap-2"
                    >
                      Get Directions
                    </a>
                    <button 
                      onClick={copyToClipboard}
                      className="px-6 py-2.5 bg-white/5 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2"
                    >
                      {copied ? "Address Copied!" : "Copy Address"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 shadow-xl">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-4">
                  <Phone size={24} />
                </div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-xs">Call Us</h4>
                <a href="tel:0550320035" className="text-gray-400 font-black text-lg hover:text-yellow-500 transition-colors">0550 32 00 35</a>
              </div>

              <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 shadow-xl">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-4">
                  <Clock size={24} />
                </div>
                <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-xs">Hours</h4>
                <p className="text-gray-400 font-bold">11:00 AM – 1:00 AM</p>
                <span className="inline-block mt-2 text-[10px] font-black text-green-500 uppercase tracking-widest px-2 py-0.5 bg-green-500/10 rounded-md border border-green-500/20">Open Daily</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-[500px] rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl">
            <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3200.743124432168!2d2.973410315245885!3d36.71261397996768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128faf90e82c5f95%3A0x6d1c7f4223f0340b!2sBaba%20Hassen!5e0!3m2!1sen!2sdz!4v1625000000000!5m2!1sen!2sdz" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              className="grayscale invert brightness-90 contrast-125 group-hover:grayscale-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
            ></iframe>
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 transform translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white text-xs font-bold text-center uppercase tracking-widest">Visit us in the heart of Baba Hassan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 text-center">
      <div className="flex items-center justify-center gap-2 mb-6">
        <img src="/logo.png" alt="Logo" className="h-14 w-14" />
        <span className="text-xl font-bold text-white tracking-tighter uppercase">CASA<span className="text-yellow-500">BURGER</span></span>
      </div>
      <p className="text-gray-600 text-sm mb-4">&copy; {new Date().getFullYear()} Casa Burger Algiers.</p>
    </footer>
  );
};

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl + Shift + A
      if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === 'A') {
        e.preventDefault();
        navigate('/admin-secret-access');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-yellow-500 selection:text-black text-white">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <main>
        <Hero />
        <About />
        <Menu />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
