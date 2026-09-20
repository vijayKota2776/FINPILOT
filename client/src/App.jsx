
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import { DemoLayout } from './components/demo/DemoLayout';
import StepConnect from './pages/demo/StepConnect';
import StepProcess from './pages/demo/StepProcess';
import Reconciliation from './pages/demo/Reconciliation';
import Dashboard from './pages/demo/Dashboard';
import AIAssistant from './pages/demo/AIAssistant';

// Auth imports
import { AuthProvider } from './context/AuthContext';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Workspace imports
import { WorkspaceProvider } from './context/WorkspaceContext';
import WorkspaceLayout from './pages/dashboard/WorkspaceLayout';
import MainDashboard from './pages/dashboard/MainDashboard';

// Onboarding imports
import OnboardingLayout from './pages/onboarding/OnboardingLayout';
import CompanyInfo from './pages/onboarding/CompanyInfo';
import KYCVerification from './pages/onboarding/KYCVerification';
import Connections from './pages/onboarding/Connections';
import TeamSetup from './pages/onboarding/TeamSetup';
import Complete from './pages/onboarding/Complete';

function App() {
  return (
    <AuthProvider>
      <WorkspaceProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Authenticated Dashboard Routes */}
            <Route path="/dashboard" element={<WorkspaceLayout />}>
              <Route index element={<MainDashboard />} />
            </Route>
            
            {/* Onboarding Routes */}
            <Route path="/onboarding" element={<OnboardingLayout />}>
              <Route index element={<CompanyInfo />} />
              <Route path="company" element={<CompanyInfo />} />
              <Route path="verification" element={<KYCVerification />} />
              <Route path="connections" element={<Connections />} />
              <Route path="team" element={<TeamSetup />} />
              <Route path="complete" element={<Complete />} />
            </Route>
            
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
      </WorkspaceProvider>
    </AuthProvider>
  );
}

export default App;
