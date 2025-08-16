import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from './ProductCard';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, 'products'), where('isActive', '==', true));
        const snap = await getDocs(q);
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setProducts(list);
      } catch (e) {
        console.error('Failed to load products from Firestore:', e);
        setProducts([]);
      }
    };
    load();
  }, []);

  return (
    <div style={{background:'#f8fafc', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <Header />
      <div style={{position:'relative', zIndex:1, paddingTop:'2px'}}>
        <ProductCard products={products} />
      </div>
      <Footer />
    </div>
  );
}
