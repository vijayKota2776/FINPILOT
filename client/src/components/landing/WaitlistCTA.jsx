
import React from 'react';
import { Button } from '../ui/button';

export function WaitlistCTA({ onWaitlistClick }) {
  return (
    <section className="py-24 px-6 bg-blue-950 text-center border-t border-blue-900">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Finance is changing.<br />Get early access.</h2>
        <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
          Join the FinPilot early-access list and be among the first to experience AI-powered finance for Indian SMBs.
        </p>
        <Button size="lg" className="h-14 px-10 text-lg bg-blue-500 hover:bg-blue-400 text-white shadow-xl shadow-blue-900/50" onClick={onWaitlistClick}>
          Join the Waitlist
        </Button>
      </div>
    </section>
  );
}