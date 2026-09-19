
import React, { useState } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { FinancialMoment } from '../components/landing/FinancialMoment';
import { ProductWalkthrough } from '../components/landing/ProductWalkthrough';
import { FeatureBento } from '../components/landing/FeatureBento';
import { SecuritySection } from '../components/landing/SecuritySection';
import { CTASection } from '../components/landing/CTASection';
import { FAQ } from '../components/landing/FAQ';
import { Footer } from '../components/landing/Footer';
import { WaitlistModal } from '../components/landing/WaitlistModal';

export default function Landing() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth selection:bg-blue-200">
      <Navbar onWaitlistClick={() => setWaitlistOpen(true)} />
      <Hero onWaitlistClick={() => setWaitlistOpen(true)} />
      <FinancialMoment />
      <ProductWalkthrough />
      <FeatureBento />
      <SecuritySection />
      <CTASection onWaitlistClick={() => setWaitlistOpen(true)} />
      <FAQ />
      <Footer />
      
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
