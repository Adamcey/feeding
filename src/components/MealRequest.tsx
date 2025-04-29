import React, { useState } from 'react';
import { ClipboardList, Plus, Clock, Calendar, Users, UtensilsCrossed } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { FormSection } from './common/FormSection';
import { FormField } from './common/FormField';
import { MealRequest } from '../types';
import { mockMealRequests } from '../lib/mockData';

export default function MealRequestComponent() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  
  // Filter requests based on user's role and state/kitchen
  const filteredRequests = mockMealRequests.filter(request => {
    if (user?.role === 'State Representative') {
      return request.state === user.state;
    }
    if (user?.role === 'Kitchen Representative') {
      return request.kitchen === user.kitchen;
    }
    return true;
  });

  const [requests, setRequests] = useState<MealRequest[]>(filteredRequests);

  const initialFormData = {
    mealType: '',
    menu: '',
    deliveryDateTime: '',
    totalPilgrims: 0,
    specialDietCount: 0,
    specialDietDetails: '',
    additionalNotes: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: MealRequest = {
      id: crypto.randomUUID(),
      state: user?.state || '',
      kitchen: user?.kitchen || '',
      mealType: formData.mealType as 'Breakfast' | 'Lunch' | 'Dinner',
      menu: formData.menu,
      deliveryDateTime: formData.deliveryDateTime,
      totalPilgrims: formData.totalPilgrims,
      specialDietCount: formData.specialDietCount,
      specialDietDetails: formData.specialDietDetails,
      additionalNotes: formData.additionalNotes,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRequests([newRequest, ...requests]);
    setFormData(initialFormData);
    setShowForm(false);
  };

  // Only show the "New Request" button for State Representatives
  const canCreateRequest = user?.role === 'State Representative';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ClipboardList className="w-6 h-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">Meal Requests</h1>
        </div>
        {canCreateRequest && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </button>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">New Meal Request</h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <FormSection title="Meal Details">
                <FormField label="Type of Meal" required>
                  <select
                    value={formData.mealType}
                    onChange={(e) => setFormData(prev => ({ ...prev, mealType: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  >
                    <option value="">Select meal type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </FormField>

                <FormField label="Menu" required>
                  <textarea
                    value={formData.menu}
                    onChange={(e) => setFormData(prev => ({ ...prev, menu: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows={3}
                    placeholder="Enter menu details..."
                    required
                  />
                </FormField>

                <FormField label="Date & Time of Delivery" required>
                  <input
                    type="datetime-local"
                    value={formData.deliveryDateTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, deliveryDateTime: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </FormField>

                <FormField label="Total Number of Pilgrims" required>
                  <input
                    type="number"
                    value={formData.totalPilgrims}
                    onChange={(e) => setFormData(prev => ({ ...prev, totalPilgrims: parseInt(e.target.value) }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    min="0"
                    required
                  />
                </FormField>
              </FormSection>

              <FormSection title="Special Diet Requirements">
                <FormField label="Number of Special Diet Meals">
                  <input
                    type="number"
                    value={formData.specialDietCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialDietCount: parseInt(e.target.value) }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    min="0"
                  />
                </FormField>

                <FormField label="Special Diet Details">
                  <textarea
                    value={formData.specialDietDetails}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialDietDetails: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows={3}
                    placeholder="Enter special diet requirements (e.g., diabetic meals, allergies)..."
                  />
                </FormField>

                <FormField label="Additional Notes">
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows={3}
                    placeholder="Any additional notes or requirements..."
                  />
                </FormField>
              </FormSection>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Requests</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meal Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pilgrims Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Special Diet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UtensilsCrossed className="flex-shrink-0 h-5 w-5 text-gray-400" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.mealType}</div>
                        <div className="text-sm text-gray-500">{request.menu.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(request.deliveryDateTime).toLocaleDateString()}
                      </span>
                      <Clock className="flex-shrink-0 h-5 w-5 text-gray-400 ml-4 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(request.deliveryDateTime).toLocaleTimeString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{request.totalPilgrims}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{request.specialDietCount}</div>
                    {request.specialDietDetails && (
                      <div className="text-sm text-gray-500">{request.specialDietDetails.substring(0, 50)}...</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}