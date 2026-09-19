
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import { DemoLayout } from './components/demo/DemoLayout';
import StepConnect from './pages/demo/StepConnect';
import StepProcess from './pages/demo/StepProcess';
import Reconciliation from './pages/demo/Reconciliation';
import Dashboard from './pages/demo/Dashboard';
import AIAssistant from './pages/demo/AIAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Guided Demo Workspace Routes */}
        <Route path="/demo" element={<DemoLayout />}>
          <Route path="connect" element={<StepConnect />} />
          <Route path="process" element={<StepProcess />} />
          <Route path="review" element={<Reconciliation />} />
          <Route path="understand" element={<Dashboard />} />
          <Route path="act" element={<AIAssistant />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
