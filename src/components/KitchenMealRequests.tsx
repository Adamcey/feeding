import React, { useState } from 'react';
import { ClipboardList, Check, Clock, Calendar, Users, UtensilsCrossed, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAudit } from '../contexts/AuditContext';
import { MealRequest } from '../types';
import { mockMealRequests } from '../lib/mockData';

export default function KitchenMealRequests() {
  const { user } = useAuth();
  const { logAction } = useAudit();
  const [requests, setRequests] = useState<MealRequest[]>(mockMealRequests);

  const handleDeliveryConfirmation = (request: MealRequest) => {
    const updatedRequests = requests.map(req => 
      req.id === request.id 
        ? { ...req, status: 'Delivered' as const, updatedAt: new Date().toISOString() }
        : req
    );
    
    setRequests(updatedRequests);
    
    logAction(
      'Meal Delivery',
      'meal_request',
      `Marked meal request as delivered for ${request.state} - ${request.mealType}`,
      { email: user?.email || '', role: user?.role || '' }
    );
  };

  // Filter requests based on the kitchen user
  const filteredRequests = requests.filter(request => request.kitchen === user?.kitchen);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <ClipboardList className="w-6 h-6 text-gray-600" />
        <h1 className="text-2xl font-bold text-gray-900">Kitchen Meal Requests</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Pending Deliveries</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meal Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Counts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests
                .filter(request => request.status === 'Approved')
                .map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.state}</div>
                    </td>
                    <td className="px-6 py-4">
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
                        <div>
                          <div className="text-sm text-gray-900">Total: {request.totalPilgrims}</div>
                          {request.specialDietCount > 0 && (
                            <div className="text-sm text-gray-500">
                              Special Diet: {request.specialDietCount}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDeliveryConfirmation(request)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Delivered
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Delivered Meals</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meal Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Counts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests
                .filter(request => request.status === 'Delivered')
                .map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.state}</div>
                    </td>
                    <td className="px-6 py-4">
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
                        <div>
                          <div className="text-sm text-gray-900">Total: {request.totalPilgrims}</div>
                          {request.specialDietCount > 0 && (
                            <div className="text-sm text-gray-500">
                              Special Diet: {request.specialDietCount}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
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