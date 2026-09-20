
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Navbar({ onWaitlistClick }) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-slate-200/60 shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold tracking-tight text-slate-950 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-black shadow-inner">F</div>
            FINPILOT
          </div>
        </div>
        
        <div className="hidden md:flex gap-4 items-center">
          <button onClick={() => navigate('/login')} className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
            Log in
          </button>
          <button onClick={() => navigate('/signup')} className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full shadow-sm transition-all hover:shadow">
            Sign up
          </button>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t py-4 px-6 flex flex-col gap-4">
          <button onClick={() => navigate('/demo/connect')} className="w-full text-center text-sm font-medium border border-slate-200 py-3 rounded-lg text-slate-900">Explore Demo</button>
          <button onClick={() => navigate('/login')} className="w-full text-center text-sm font-medium bg-slate-50 text-slate-900 py-3 rounded-lg border border-slate-200">Log in</button>
          <button onClick={() => navigate('/signup')} className="w-full text-center text-sm font-medium bg-blue-600 text-white py-3 rounded-lg">Sign up</button>
        </div>
      )}
    </nav>
  );
}