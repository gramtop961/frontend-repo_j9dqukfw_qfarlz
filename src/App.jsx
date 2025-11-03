import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import BrowseFood from './components/BrowseFood.jsx';
import DonateFood from './components/DonateFood.jsx';
import Dashboard from './components/Dashboard.jsx';

const seedFoods = [
  {
    id: crypto.randomUUID(),
    title: 'Fresh Veggie Pasta',
    description: 'Home-cooked pasta with veggies. Packed safely. 3 portions.',
    location: 'Downtown',
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop',
    quantity: 3,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().slice(0, 10),
    contact: 'DM for pickup time',
    postedBy: 'seed-user-1',
  },
  {
    id: crypto.randomUUID(),
    title: 'Surplus Sandwiches',
    description: 'Leftover from event. Individually wrapped.',
    location: 'Uptown',
    imageUrl: 'https://images.unsplash.com/photo-1562042149-80f8f08fa4e7?q=80&w=1200&auto=format&fit=crop',
    quantity: 8,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString().slice(0, 10),
    contact: 'Text before arrival',
    postedBy: 'seed-user-2',
  },
  {
    id: crypto.randomUUID(),
    title: 'Fruit Basket',
    description: 'Apples and bananas. Perfectly good, just extra.',
    location: 'West Side',
    imageUrl: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?q=80&w=1200&auto=format&fit=crop',
    quantity: 10,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString().slice(0, 10),
    contact: 'Call on arrival',
    postedBy: 'seed-user-3',
  },
];

const STORAGE_KEYS = {
  foods: 'feedit_foods_v1',
  claims: 'feedit_claims_v1',
  user: 'feedit_user_v1',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('browse');
  const [foods, setFoods] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.foods);
    return stored ? JSON.parse(stored) : seedFoods;
  });
  const [claims, setClaims] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.claims);
    return stored ? JSON.parse(stored) : [];
  });
  const [user] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.user);
    if (stored) return JSON.parse(stored);
    const fresh = { id: `user-${Math.random().toString(36).slice(2, 8)}`, name: 'You' };
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(fresh));
    return fresh;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.foods, JSON.stringify(foods));
  }, [foods]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.claims, JSON.stringify(claims));
  }, [claims]);

  const myDonations = useMemo(() => foods.filter(f => f.postedBy === user.id), [foods, user.id]);

  function addDonation(newItem) {
    setFoods(prev => [{ ...newItem, id: crypto.randomUUID(), postedBy: user.id }, ...prev]);
    setActiveTab('dashboard');
  }

  function claimFood(foodId) {
    setFoods(prev => prev.map(f => (f.id === foodId && f.quantity > 0 ? { ...f, quantity: f.quantity - 1 } : f)));
    const item = foods.find(f => f.id === foodId);
    if (!item) return;
    setClaims(prev => [{ id: crypto.randomUUID(), foodId, title: item.title, imageUrl: item.imageUrl, when: new Date().toISOString(), location: item.location }, ...prev]);
    setActiveTab('dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-slate-800">
      <Navbar active={activeTab} onNavigate={setActiveTab} />

      <main className="mx-auto max-w-6xl px-4 pb-24">
        <header className="py-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-emerald-700">FEEDIT</h1>
          <p className="mt-2 text-slate-600">Share surplus food. Claim what you need. Reduce waste together.</p>
        </header>

        {activeTab === 'browse' && (
          <BrowseFood foods={foods} onClaim={claimFood} />
        )}

        {activeTab === 'donate' && (
          <DonateFood onSubmit={addDonation} />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard myDonations={myDonations} claims={claims} />
        )}
      </main>

      <footer className="border-t border-emerald-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Made with care to fight food waste.</span>
          <span className="text-slate-500">© {new Date().getFullYear()} FEEDIT</span>
        </div>
      </footer>
    </div>
  );
}
