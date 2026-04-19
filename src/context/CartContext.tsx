import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  deleteDoc, 
  doc,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  price: number;
  desc: string;
  img: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  wilaya: string;
  address: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Pending' | 'Completed';
  customer: CustomerInfo;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  placeOrder: (customer: CustomerInfo) => Promise<boolean>;
  orders: Order[];
  deleteOrder: (id: string) => Promise<void>;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  isSyncing: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);

  // Real-time listener for Orders
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData: Order[] = snapshot.docs.map(doc => {
          const data = doc.data();
          let dateStr = "N/A";
          if (data.createdAt instanceof Timestamp) {
            dateStr = data.createdAt.toDate().toLocaleString('fr-DZ');
          } else {
            dateStr = new Date().toLocaleString('fr-DZ');
          }
          return {
            id: doc.id,
            ...data,
            date: dateStr
          } as Order;
        });
        setOrders(ordersData);
        setIsSyncing(false);
      }, (err) => {
        console.error("Firestore Listen Error:", err);
        setIsSyncing(false);
      });
    } catch (e) {
      console.error("Firebase Setup Error:", e);
      setIsSyncing(false);
    }
    return () => unsubscribe();
  }, []);

  // Real-time listener for Products
  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData: Product[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      setProducts(productsData);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('casa_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('casa_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const placeOrder = async (customer: CustomerInfo): Promise<boolean> => {
    if (cart.length === 0) return false;

    try {
      const orderPayload = {
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        customer: customer,
        status: 'Pending',
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "orders"), orderPayload);
      if (docRef.id) {
        clearCart();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Firebase placeOrder Error:', error);
      return false;
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await deleteDoc(doc(db, "orders", id));
    } catch (e) {
      console.error('Firebase deleteOrder Error:', e);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      await addDoc(collection(db, "products"), product);
    } catch (e) {
      console.error('Firebase addProduct Error:', e);
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      const { setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, "products", id), product, { merge: true });
    } catch (e) {
      console.error('Firebase updateProduct Error:', e);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (e) {
      console.error('Firebase deleteProduct Error:', e);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      placeOrder, orders, deleteOrder, 
      products, addProduct, updateProduct, deleteProduct,
      isSyncing 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
 
