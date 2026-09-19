
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import { DemoLayout } from './components/demo/DemoLayout';
import Dashboard from './pages/demo/Dashboard';
import Transactions from './pages/demo/Transactions';
import Reconciliation from './pages/demo/Reconciliation';
import AIAssistant from './pages/demo/AIAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Demo Workspace Routes */}
        <Route path="/demo" element={<DemoLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="reconciliation" element={<Reconciliation />} />
          <Route path="assistant" element={<AIAssistant />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
