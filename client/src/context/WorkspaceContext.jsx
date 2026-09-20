import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [activeCompanyId, setActiveCompanyId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setCompanies([]);
      setActiveCompanyId(null);
      setLoading(false);
      return;
    }

    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/companies/my', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.success) {
          setCompanies(data.data);
          
          if (data.data.length > 0) {
            // Check if there's a saved preference in localstorage
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
      loading 
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
