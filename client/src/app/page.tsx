'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    niche: '',
    location: '',
    numberOfLeads: '',
  });
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/leads/');
      const data = await response.json();
      setLeads(data.leads);
    } catch (error) {
      console.error('Error fetching leads:', error);
      alert('Error fetching leads. Make sure the Django server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">LeadFinder</h1>
          <p className="text-gray-600 mt-1">Find the perfect leads for your business</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Leads</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Niche/Industry Field */}
                <div>
                  <label htmlFor="niche" className="block text-sm font-semibold text-gray-700 mb-2">
                    Niche or Industry
                  </label>
                  <select
                    id="niche"
                    name="niche"
                    value={formData.niche}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-900 placeholder-gray-400"
                  >
                    <option value="">Select an industry</option>
                    <option value="dental">Dental</option>
                    <option value="medical">Medical</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="tech">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="retail">Retail</option>
                    <option value="real-estate">Real Estate</option>
                  </select>
                </div>

                {/* Location Field */}
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Mexico City"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Number of Leads Field */}
                <div>
                  <label htmlFor="numberOfLeads" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Leads
                  </label>
                  <input
                    id="numberOfLeads"
                    type="number"
                    name="numberOfLeads"
                    value={formData.numberOfLeads}
                    onChange={handleChange}
                    placeholder="e.g., 50"
                    min="1"
                    max="1000"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Finding Leads...
                    </span>
                  ) : (
                    'Find Leads'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {leads.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Found Leads</h3>
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                    {leads.length} leads
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {leads.map((lead, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-l-4 border-blue-500"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-gray-900">{lead.name}</h4>
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                          <a href={lead.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">
                            {lead.website}
                          </a>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{lead.city}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="mb-4">
                  <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads yet</h3>
                <p className="text-gray-600">Fill out the form and click "Find Leads" to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
