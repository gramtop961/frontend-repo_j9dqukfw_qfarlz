import { Home, PlusCircle, Gift } from 'lucide-react';

export default function Navbar({ active, onNavigate }) {
  const tabs = [
    { key: 'browse', label: 'Browse Food', icon: Home },
    { key: 'donate', label: 'Donate Food', icon: PlusCircle },
    { key: 'dashboard', label: 'My Space', icon: Gift },
  ];

  return (
    <div className="sticky top-0 z-20 w-full border-b border-emerald-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="font-bold text-emerald-700">FEEDIT</div>

          <div className="flex items-center gap-1">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-emerald-50 ${
                  active === key ? 'text-emerald-700 bg-emerald-50' : 'text-slate-700'
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
