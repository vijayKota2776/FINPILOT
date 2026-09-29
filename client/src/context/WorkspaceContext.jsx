import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [activeCompanyId, setActiveCompanyId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setCompanies(data.data);
        
        if (data.data.length > 0) {
          const saved = localStorage.getItem('active_company_id');
          const exists = data.data.find(c => c._id === saved);
          
          if (exists) {
            setActiveCompanyId(saved);
          } else {
            setActiveCompanyId(data.data[0]._id);
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch workspaces', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setCompanies([]);
      setActiveCompanyId(null);
      setLoading(false);
      return;
    }
    fetchCompanies();
  }, [isAuthenticated, user]);

  const switchWorkspace = (id) => {
    setActiveCompanyId(id);
    localStorage.setItem('active_company_id', id);
  };

  const activeCompany = companies.find(c => c._id === activeCompanyId) || null;

  return (
    <WorkspaceContext.Provider value={{ 
      companies, 
      activeCompanyId, 
      activeCompany,
      switchWorkspace,
      refreshWorkspaces: fetchCompanies,
      loading 
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
  
