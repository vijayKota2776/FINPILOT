const fs = require('fs');
const path = require('path');

const files = {
  'client/src/App.jsx': `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DemoDashboard from './pages/demo/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/demo/*" element={<DemoDashboard />} />
      </Routes>
    </Router>
  );
}
export default App;`,

  'client/src/pages/Landing.jsx': `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="flex justify-between items-center p-6 bg-white shadow-sm">
        <div className="text-2xl font-bold text-blue-900">FINPILOT</div>
        <div className="hidden md:flex gap-6">
          <a href="#" className="text-slate-600 hover:text-blue-900">Product</a>
          <a href="#" className="text-slate-600 hover:text-blue-900">How it Works</a>
          <a href="#" className="text-slate-600 hover:text-blue-900">Features</a>
          <a href="#" className="text-slate-600 hover:text-blue-900">Demo</a>
          <a href="#" className="text-slate-600 hover:text-blue-900">Security</a>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost">Log in</Button>
          <Button onClick={() => navigate('/demo')}>Join the Waitlist</Button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
          AI-Powered Finance for Indian SMBs
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10">
          Connect your financial data, automate repetitive finance work, and understand your business from one intelligent finance workspace.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg" onClick={() => navigate('/demo')}>Explore Interactive Demo</Button>
          <Button size="lg" variant="outline" className="text-lg">Join Early Access</Button>
        </div>
        <p className="mt-6 text-sm text-slate-500 font-medium">Built for founders, accountants, and finance teams.</p>
        
        {/* Dashboard Preview Section */}
        <div className="mt-20 border-4 border-slate-200 rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-8 bg-slate-200 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="mt-8 bg-slate-50 h-96 flex items-center justify-center">
             <div className="text-slate-400 text-xl font-medium">Interactive Demo Preview... (Click Explore)</div>
          </div>
        </div>
      </main>
    </div>
  );
}`,

  'client/src/pages/demo/Dashboard.jsx': `import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

export default function DemoDashboard() {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-950 text-white p-6 flex flex-col">
        <div className="text-2xl font-bold mb-8 text-blue-100">FINPILOT</div>
        <div className="text-xs font-semibold text-blue-400 mb-4 tracking-wider uppercase">Demo Workspace</div>
        <nav className="flex-1 space-y-2">
          {['Dashboard', 'Transactions', 'Bank Connections', 'Invoices', 'Bills', 'Reconciliation', 'Reports', 'AI Assistant'].map(item => (
            <a key={item} href="#" className="block px-3 py-2 rounded hover:bg-blue-900 transition-colors">{item}</a>
          ))}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Good morning, Rahul 👋</h1>
            <p className="text-slate-500 mt-1">Here's what's happening in your business today.</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium text-sm flex items-center border border-yellow-200">
            ⚠️ DEMO WORKSPACE - SAMPLE DATA
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Income', value: '₹12,45,000', color: 'text-green-600' },
            { label: 'Total Expenses', value: '₹8,32,000', color: 'text-red-600' },
            { label: 'Net Profit', value: '₹4,13,000', color: 'text-blue-600' },
            { label: 'Cash Balance', value: '₹6,78,240', color: 'text-slate-900' }
          ].map(metric => (
            <Card key={metric.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-500 font-medium">{metric.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={\`text-3xl font-bold \${metric.color}\`}>{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join('/Users/vijaykota/Documents/FINPILOT', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('Created:', filepath);
});
