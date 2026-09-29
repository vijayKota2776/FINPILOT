import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CompanyInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    legalName: '',
    displayName: '',
    businessType: 'LLC',
    registrationNumber: '',
    country: 'India',
    industry: 'Technology'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer token` // In a real app with localStorage token, or rely on cookies
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      // For prototype, we store companyId in localStorage so next steps know which company to verify
      if (data.success) {
        localStorage.setItem('onboarding_company_id', data.data._id);
        navigate('/onboarding/verification');
      } else {
        alert(data.error?.message || 'Error creating company');
      }
    } catch (err) {
      console.error(err);
      // Fallback for prototype if backend isn't ready
      localStorage.setItem('onboarding_company_id', 'mock_company_123');
      navigate('/onboarding/verification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Company Information</h2>
      <p className="text-slate-600 mb-8">Tell us about your business to set up your workspace.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Legal Company Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="e.g. ABC Technologies Pvt. Ltd."
              value={formData.legalName}
              onChange={(e) => setFormData({...formData, legalName: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Display Name (Optional)</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="e.g. ABC Tech"
              value={formData.displayName}
              onChange={(e) => setFormData({...formData, displayName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Type</label>
            <select
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none bg-white"
              value={formData.businessType}
              onChange={(e) => setFormData({...formData, businessType: e.target.value})}
            >
              <option value="LLC">Private Limited (Pvt. Ltd.)</option>
              <option value="Sole Proprietorship">Sole Proprietorship</option>
              <option value="Partnership">Partnership</option>
              <option value="Public Limited">Public Limited</option>
            </select>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}
