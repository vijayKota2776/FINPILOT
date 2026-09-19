
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export function DemoCTA({ onWaitlistClick }) {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-6 bg-blue-50/80 border-y border-blue-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">
          Don't just read about FinPilot.<br />Try it.
        </h2>
        <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
          Explore a fictional Indian business and see how FinPilot handles transactions, reconciliation, invoices and financial questions.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg" onClick={() => navigate('/demo')}>
            Launch Interactive Demo <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-blue-200 text-blue-800 hover:bg-blue-100" onClick={onWaitlistClick}>
            Join the Waitlist
          </Button>
        </div>
        <p className="mt-6 text-sm text-blue-600/70 font-medium">* Uses simulated financial data</p>
      </div>
    </section>
  );
}