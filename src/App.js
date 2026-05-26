import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBU2a95DR8HcHRIdZEAlalL376klF4sC-A",
  authDomain: "ogastock-eed9a.firebaseapp.com",
  projectId: "ogastock-eed9a",
  storageBucket: "ogastock-eed9a.firebasestorage.app",
  messagingSenderId: "614768416124",
  appId: "1:614768416124:web:4132ca0b50deec8d2600f9",
  measurementId: "G-KZQTKWVYXQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function OgaStockWebsite() {
  const [activeSection, setActiveSection] = useState('home');
  const [ads, setAds] = useState([]);
  const [showAdForm, setShowAdForm] = useState(false);
  const [adForm, setAdForm] = useState({ businessName: '', category: '', description: '', phone: '', location: '', website: '' });
  const [adSubmitted, setAdSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    try {
      const q = query(collection(db, 'website_ads'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setAds(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      console.log('Loading ads...');
    }
  };

  const submitAd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'website_ads'), {
        ...adForm,
        createdAt: serverTimestamp(),
        approved: true,
      });
      setAdSubmitted(true);
      setAdForm({ businessName: '', category: '', description: '', phone: '', location: '', website: '' });
      loadAds();
      setTimeout(() => { setAdSubmitted(false); setShowAdForm(false); }, 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
    setMenuOpen(false);
  };

  const categories = ['Building Materials', 'Hardware', 'Cement Dealer', 'Sand & Aggregate', 'Iron & Steel', 'Roofing', 'Paint & Finishing', 'Plumbing', 'Electrical', 'Other'];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#1a1a2e', margin: 0, padding: 0 }}>
      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(13,71,161,0.97)', backdropFilter: 'blur(10px)', padding: '0 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'white', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#0D47A1', fontSize: 16 }}>O</div>
          <span style={{ color: 'white', fontWeight: 800, fontSize: 20 }}>OgaStock</span>
        </div>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {['home', 'about', 'features', 'pricing', 'ads', 'contact'].map(s => (
            <button key={s} onClick={() => scrollTo(s)} style={{ background: 'none', border: 'none', color: activeSection === s ? '#FFD700' : 'rgba(255,255,255,0.85)', fontWeight: activeSection === s ? 700 : 500, fontSize: 14, cursor: 'pointer', textTransform: 'capitalize', padding: '6px 0' }}>{s === 'ads' ? 'Business Ads' : s}</button>
          ))}
          <button onClick={() => scrollTo('download')} style={{ background: '#FFD700', border: 'none', borderRadius: 20, padding: '8px 20px', fontWeight: 700, color: '#0D47A1', cursor: 'pointer', fontSize: 14 }}>Download App</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 40%, #0a2d6e 100%)', display: 'flex', alignItems: 'center', padding: '100px 5% 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '10%', width: 250, height: 250, background: 'rgba(255,215,0,0.05)', borderRadius: '50%' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: 20, padding: '6px 16px', marginBottom: 20 }}>
              <span style={{ color: '#FFD700', fontSize: 13, fontWeight: 600 }}>🚀 Built for African Businesses</span>
            </div>
            <h1 style={{ fontSize: 52, fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: 20, margin: '0 0 20px' }}>
              Run Your Building Materials Business<br />
              <span style={{ color: '#FFD700' }}>Smarter with One13</span>
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 32, maxWidth: 500 }}>
              The only inventory management app built specifically for Nigerian building materials traders. Works offline. Real-time updates. Multi-branch support.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button onClick={() => scrollTo('download')} style={{ background: '#FFD700', border: 'none', borderRadius: 12, padding: '16px 32px', fontWeight: 800, color: '#0D47A1', cursor: 'pointer', fontSize: 16 }}>📱 Download Free</button>
              <button onClick={() => scrollTo('features')} style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 12, padding: '16px 32px', fontWeight: 700, color: 'white', cursor: 'pointer', fontSize: 16 }}>See Features →</button>
            </div>
            <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
              {[['500+', 'Businesses'], ['99.9%', 'Uptime'], ['5★', 'Rated'], ['Free', 'To Start']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#FFD700' }}>{n}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 280, height: 560, background: 'rgba(255,255,255,0.08)', borderRadius: 40, border: '2px solid rgba(255,255,255,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', backdropFilter: 'blur(10px)' }}>
              <div style={{ width: 240, background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 16, marginBottom: 12 }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginBottom: 4 }}>Today's Sales</div>
                <div style={{ color: '#FFD700', fontSize: 28, fontWeight: 900 }}>₦847,500</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>↑ 12% from yesterday</div>
              </div>
              {[['Dangote Cement', '45 bags', '#4CAF50'], ['BUA Cement', '32 bags', '#2196F3'], ['Y12 Iron Rod', '20 lengths', '#FF9800']].map(([name, qty, color]) => (
                <div key={name} style={{ width: 240, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '10px 14px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>{name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>In stock: {qty}</div>
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                </div>
              ))}
              <div style={{ width: 240, background: 'rgba(255,165,0,0.15)', borderRadius: 12, padding: '10px 14px', marginTop: 4, border: '1px solid rgba(255,165,0,0.3)' }}>
                <div style={{ color: '#FFD700', fontSize: 11, fontWeight: 700 }}>⚠ Low Stock Alert</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Lafarge Cement — 8 bags left</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '80px 5%', background: '#f8faff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ background: '#e3f2fd', color: '#0D47A1', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600 }}>Our Story</span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: '#0D47A1', margin: '16px 0 16px' }}>Built by Africans, for African Traders</h2>
            <p style={{ fontSize: 17, color: '#555', maxWidth: 700, margin: '0 auto', lineHeight: 1.8 }}>
              OgaStock was born from a real problem. Thousands of building materials traders across Nigeria manage millions of naira in stock using paper records and mental calculations — losing money every day to errors, theft and poor stock control.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { icon: '🏗️', title: 'The Problem', text: 'Building materials traders in Nigeria lose an estimated 15-20% of revenue to poor stock management, unrecorded sales and cash discrepancies.' },
              { icon: '💡', title: 'Our Solution', text: 'One13 is the first inventory management app built specifically for building materials — with cement brands, iron rod sizes and offline-first design.' },
              { icon: '🌍', title: 'Our Vision', text: 'To become the standard business management platform for building materials traders across Africa — starting from Nigeria.' },
            ].map(({ icon, title, text }) => (
              <div key={title} style={{ background: 'white', borderRadius: 20, padding: 32, boxShadow: '0 4px 24px rgba(13,71,161,0.08)' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0D47A1', marginBottom: 12 }}>{title}</h3>
                <p style={{ color: '#666', lineHeight: 1.7, fontSize: 15 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '80px 5%', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ background: '#e3f2fd', color: '#0D47A1', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600 }}>Features</span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: '#0D47A1', margin: '16px 0 16px' }}>Everything Your Business Needs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '📦', title: 'Smart Inventory', desc: 'Track cement, iron rods, sand and all building materials with proper units. Purchase orders update stock automatically.' },
              { icon: '💰', title: 'Sales Recording', desc: 'Record sales with Cash, POS or Transfer. Owner controls all edits. Complete audit trail of every transaction.' },
              { icon: '🌙', title: 'Day End Process', desc: 'Sales rep submits daily cash count. Owner approves. Automatic reconciliation ensures cash and sales always balance.' },
              { icon: '📊', title: 'Real-time Reports', desc: 'Daily, weekly, monthly and yearly reports. Sales by branch, top products, profit and loss at your fingertips.' },
              { icon: '📴', title: 'Works Offline', desc: 'No internet? No problem. The app works completely offline and syncs automatically when connected. Perfect for Nigeria.' },
              { icon: '🏪', title: 'Multi-Branch', desc: 'Manage multiple shops from one account. Transfer stock between branches. See all locations in one dashboard.' },
              { icon: '🔄', title: 'Stock Transfers', desc: 'Transfer stock from your warehouse to any shop or between shops. Full transfer history with reference numbers.' },
              { icon: '🔍', title: 'Audit Trail', desc: 'Every action is logged — who did it, when and why. Nothing can be hidden. Built for accountability.' },
              { icon: '🇳🇬', title: '5 Languages', desc: 'English, Yoruba, Hausa, Igbo and Pidgin English. Your staff can use the app in their own language.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: '#f8faff', borderRadius: 16, padding: 28, border: '1px solid #e3f2fd' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0D47A1', marginBottom: 8 }}>{title}</h3>
                <p style={{ color: '#666', lineHeight: 1.7, fontSize: 14, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '80px 5%', background: '#f8faff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ background: '#e3f2fd', color: '#0D47A1', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600 }}>Pricing</span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: '#0D47A1', margin: '16px 0 16px' }}>Simple, Affordable Pricing</h2>
            <p style={{ color: '#666', fontSize: 17 }}>No hidden fees. Cancel anytime.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { name: 'Starter', price: '₦0', period: 'Forever free', color: '#f8faff', border: '#e3f2fd', features: ['1 branch', 'Up to 2 staff', 'Basic inventory', 'Sales recording', 'Day End process', 'Email support'] },
              { name: 'Business', price: '₦2,000', period: 'per month', color: '#0D47A1', border: '#0D47A1', features: ['Up to 5 branches', 'Unlimited staff', 'Full inventory', 'Stock transfers', 'Advanced reports', 'Audit trail', 'Priority support', 'Business directory listing'], highlight: true },
              { name: 'Enterprise', price: '₦5,000', period: 'per month', color: '#f8faff', border: '#e3f2fd', features: ['Unlimited branches', 'Unlimited staff', 'Everything in Business', 'Custom branding', 'API access', 'Dedicated support', 'Training included'] },
            ].map(({ name, price, period, color, border, features, highlight }) => (
              <div key={name} style={{ background: highlight ? '#0D47A1' : 'white', borderRadius: 24, padding: 36, border: `2px solid ${border}`, boxShadow: highlight ? '0 20px 60px rgba(13,71,161,0.3)' : '0 4px 24px rgba(13,71,161,0.08)', transform: highlight ? 'scale(1.05)' : 'none' }}>
                {highlight && <div style={{ background: '#FFD700', color: '#0D47A1', borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800, display: 'inline-block', marginBottom: 16 }}>MOST POPULAR</div>}
                <h3 style={{ fontSize: 22, fontWeight: 800, color: highlight ? 'white' : '#0D47A1', marginBottom: 8 }}>{name}</h3>
                <div style={{ fontSize: 40, fontWeight: 900, color: highlight ? '#FFD700' : '#0D47A1', marginBottom: 4 }}>{price}</div>
                <div style={{ color: highlight ? 'rgba(255,255,255,0.6)' : '#999', fontSize: 14, marginBottom: 28 }}>{period}</div>
                {features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: highlight ? '#FFD700' : '#4CAF50', fontWeight: 700, fontSize: 16 }}>✓</span>
                    <span style={{ color: highlight ? 'rgba(255,255,255,0.85)' : '#555', fontSize: 14 }}>{f}</span>
                  </div>
                ))}
                <button onClick={() => scrollTo('download')} style={{ width: '100%', background: highlight ? '#FFD700' : '#0D47A1', border: 'none', borderRadius: 12, padding: '14px 0', fontWeight: 800, color: highlight ? '#0D47A1' : 'white', cursor: 'pointer', fontSize: 15, marginTop: 20 }}>Get Started</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS ADS */}
      <section id="ads" style={{ padding: '80px 5%', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ background: '#e3f2fd', color: '#0D47A1', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600 }}>Business Directory</span>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: '#0D47A1', margin: '16px 0 16px' }}>Find & Advertise Your Business</h2>
            <p style={{ color: '#666', fontSize: 17, maxWidth: 600, margin: '0 auto' }}>Are you a building materials supplier, contractor or service provider? Post your free ad and reach thousands of traders.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
            <button onClick={() => setShowAdForm(!showAdForm)} style={{ background: '#0D47A1', border: 'none', borderRadius: 12, padding: '16px 40px', fontWeight: 800, color: 'white', cursor: 'pointer', fontSize: 16 }}>
              {showAdForm ? '✕ Close Form' : '+ Post Your Free Ad'}
            </button>
          </div>

          {showAdForm && (
            <div style={{ background: '#f8faff', borderRadius: 20, padding: 32, marginBottom: 40, border: '2px solid #e3f2fd', maxWidth: 600, margin: '0 auto 40px' }}>
              <h3 style={{ color: '#0D47A1', fontWeight: 800, fontSize: 20, marginBottom: 20 }}>Post Your Business Ad — Free</h3>
              {adSubmitted ? (
                <div style={{ textAlign: 'center', padding: 32 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                  <h4 style={{ color: '#4CAF50', fontWeight: 800, fontSize: 20 }}>Ad Posted Successfully!</h4>
                  <p style={{ color: '#666' }}>Your business is now visible to thousands of traders.</p>
                </div>
              ) : (
                <form onSubmit={submitAd}>
                  {[
                    { key: 'businessName', label: 'Business Name', placeholder: 'e.g. Alhaji Musa Building Materials' },
                    { key: 'location', label: 'Location', placeholder: 'e.g. Kano, Sabon Gari Market' },
                    { key: 'phone', label: 'Phone Number', placeholder: 'e.g. 0801 234 5678' },
                    { key: 'website', label: 'Website/Social Media (optional)', placeholder: 'e.g. instagram.com/yourbusiness' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key} style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontWeight: 700, color: '#333', marginBottom: 6, fontSize: 14 }}>{label}</label>
                      <input required={key !== 'website'} value={adForm[key]} onChange={e => setAdForm({ ...adForm, [key]: e.target.value })} placeholder={placeholder} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '2px solid #e3f2fd', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontWeight: 700, color: '#333', marginBottom: 6, fontSize: 14 }}>Category</label>
                    <select value={adForm.category} onChange={e => setAdForm({ ...adForm, category: e.target.value })} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '2px solid #e3f2fd', fontSize: 14, outline: 'none', background: 'white' }}>
                      <option value="">Select category...</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontWeight: 700, color: '#333', marginBottom: 6, fontSize: 14 }}>Business Description</label>
                    <textarea required value={adForm.description} onChange={e => setAdForm({ ...adForm, description: e.target.value })} placeholder="Describe your business, products and services..." rows={4} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '2px solid #e3f2fd', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                  </div>
                  <button type="submit" style={{ width: '100%', background: '#0D47A1', border: 'none', borderRadius: 12, padding: '14px 0', fontWeight: 800, color: 'white', cursor: 'pointer', fontSize: 16 }}>Post My Free Ad →</button>
                </form>
              )}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {ads.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#999' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🏪</div>
                <p>No ads yet. Be the first to post your business!</p>
              </div>
            ) : ads.map(ad => (
              <div key={ad.id} style={{ background: '#f8faff', borderRadius: 16, padding: 24, border: '2px solid #e3f2fd' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, background: '#0D47A1', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 18 }}>{ad.businessName?.[0]?.toUpperCase()}</div>
                  <span style={{ background: '#e3f2fd', color: '#0D47A1', borderRadius: 20, padding: '4px 12px', fontSize: 11, fontWeight: 600 }}>{ad.category}</span>
                </div>
                <h4 style={{ fontWeight: 800, color: '#0D47A1', fontSize: 16, marginBottom: 6 }}>{ad.businessName}</h4>
                <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{ad.description}</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {ad.location && <span style={{ color: '#999', fontSize: 12 }}>📍 {ad.location}</span>}
                  {ad.phone && <a href={`tel:${ad.phone}`} style={{ color: '#0D47A1', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>📞 {ad.phone}</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" style={{ padding: '80px 5%', background: 'linear-gradient(135deg, #0D47A1, #1565C0)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 44, fontWeight: 900, color: 'white', marginBottom: 16 }}>Start Managing Your Business Better Today</h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 40, lineHeight: 1.7 }}>Download One13 for free. No credit card required. Works on any Android phone.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/One13.apk" download style={{ background: '#FFD700', borderRadius: 14, padding: '18px 40px', fontWeight: 800, color: '#0D47A1', fontSize: 17, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              📱 Download for Android
            </a>
            <button onClick={() => scrollTo('ads')} style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 14, padding: '18px 40px', fontWeight: 700, color: 'white', cursor: 'pointer', fontSize: 17 }}>List Your Business Free</button>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 24 }}>Android 8.0+ required • 52MB • Free forever for 1 branch</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '80px 5%', background: '#f8faff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ background: '#e3f2fd', color: '#0D47A1', borderRadius: 20, padding: '6px 16px', fontSize: 13, fontWeight: 600 }}>Contact Us</span>
          <h2 style={{ fontSize: 40, fontWeight: 900, color: '#0D47A1', margin: '16px 0 16px' }}>Get In Touch</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40 }}>
            {[
              { icon: '📧', title: 'Email', value: 'hello@ogastock.com', link: 'mailto:hello@ogastock.com' },
              { icon: '💬', title: 'WhatsApp', value: 'Chat with us', link: 'https://wa.me/2348000000000' },
              { icon: '🐦', title: 'Twitter', value: '@OgaStock', link: 'https://twitter.com/ogastock' },
            ].map(({ icon, title, value, link }) => (
              <a key={title} href={link} style={{ background: 'white', borderRadius: 16, padding: 28, textDecoration: 'none', boxShadow: '0 4px 24px rgba(13,71,161,0.08)', display: 'block' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
                <h4 style={{ color: '#0D47A1', fontWeight: 800, marginBottom: 4 }}>{title}</h4>
                <p style={{ color: '#666', fontSize: 14 }}>{value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0a1628', padding: '48px 5% 32px', color: 'rgba(255,255,255,0.6)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, background: '#0D47A1', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: 16 }}>O</div>
                <span style={{ color: 'white', fontWeight: 800, fontSize: 20 }}>OgaStock</span>
              </div>
              <p style={{ lineHeight: 1.8, fontSize: 14, maxWidth: 280 }}>The smart business management platform for African building materials traders.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Download', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Privacy Policy', 'Terms'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h4 style={{ color: 'white', fontWeight: 700, marginBottom: 16 }}>{title}</h4>
                {links.map(l => <div key={l} style={{ marginBottom: 10, fontSize: 14, cursor: 'pointer' }}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13 }}>© 2025 OgaStock. All rights reserved.</span>
            <span style={{ fontSize: 13 }}>Made with ❤️ in Nigeria 🇳🇬</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
