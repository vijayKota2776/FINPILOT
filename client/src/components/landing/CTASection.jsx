
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CTASection({ onWaitlistClick }) {
  const navigate = useNavigate();
  return (
    <section className="py-32 px-6 bg-blue-600 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-700/50 mix-blend-overlay"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          See your finances <br/> in one place.
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">
          Explore the FINPILOT interactive workspace using simulated business data. No setup required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={() => navigate('/demo/connect')} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform">
            Explore Interactive Demo <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={onWaitlistClick} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 text-white font-medium rounded-xl hover:bg-blue-800 transition-colors">
            Join Early Access
          </button>
        </div>
        <p className="mt-8 text-sm text-blue-200 font-medium">* Demo uses simulated financial data.</p>
      </div>
    </section>
  );
}