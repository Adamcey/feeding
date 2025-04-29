import React, { useState, useEffect } from 'react';
import { FormSection } from './common/FormSection';
import { FormField } from './common/FormField';

interface FormData {
  state: string;
  accommodationName: string;
  kitchenName: string;
  mealType: string;
  menu: string;
  deliveryTime: string;
  totalPilgrims: number;
  totalMealsServed: number;
  shortfall: number;
  quantityAdequate: 'adequate' | 'inadequate' | '';
  qualityAdequate: 'adequate' | 'inadequate' | '';
  specialDietAdequate: 'adequate' | 'inadequate' | '';
  provisions: {
    fruits: boolean;
    water: boolean;
    juices: boolean;
  };
  utensilsAdequate: 'adequate' | 'inadequate' | '';
  hygieneStatus: {
    sufra: 'adequate' | 'inadequate' | '';
    wasteDisposal: 'adequate' | 'inadequate' | '';
  };
  remarks: string;
}

const initialFormData: FormData = {
  state: '',
  accommodationName: '',
  kitchenName: '',
  mealType: '',
  menu: '',
  deliveryTime: '',
  totalPilgrims: 0,
  totalMealsServed: 0,
  shortfall: 0,
  quantityAdequate: '',
  qualityAdequate: '',
  specialDietAdequate: '',
  provisions: {
    fruits: false,
    water: false,
    juices: false,
  },
  utensilsAdequate: '',
  hygieneStatus: {
    sufra: '',
    wasteDisposal: '',
  },
  remarks: '',
};

export default function MealAssessmentForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  const states = ['FCT', 'Lagos', 'Kano'];
  const accommodations = [
    { id: 1, name: 'Ibn Umar' },
    { id: 2, name: 'Gida' },
  ];
  const availableKitchens = [
    { id: 1, name: 'Ava Kitchen' },
    { id: 2, name: 'Za Kitchen' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProvisionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      provisions: {
        ...prev.provisions,
        [name]: checked,
      },
    }));
  };

  useEffect(() => {
    // Calculate shortfall
    const shortfall = formData.totalPilgrims - formData.totalMealsServed;
    setFormData(prev => ({
      ...prev,
      shortfall,
    }));
  }, [formData.totalPilgrims, formData.totalMealsServed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add your API call here
      console.log('Form submitted:', formData);
      // Reset form after successful submission
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">New Meal Assessment</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title="Identification">
          <FormField label="State" required>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">Select a state</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Accommodation" required>
            <select
              name="accommodationName"
              value={formData.accommodationName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">Select accommodation</option>
              {accommodations.map(acc => (
                <option key={acc.id} value={acc.name}>{acc.name}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Kitchen" required>
            <select
              name="kitchenName"
              value={formData.kitchenName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">Select a kitchen</option>
              {availableKitchens.map(kitchen => (
                <option key={kitchen.id} value={kitchen.name}>
                  {kitchen.name}
                </option>
              ))}
            </select>
          </FormField>
        </FormSection>

        <FormSection title="Meal Details">
          <FormField label="Type of Meal" required>
            <select
              name="mealType"
              value={formData.mealType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            >
              <option value="">Select meal type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </FormField>

          <FormField label="Menu" required>
            <textarea
              name="menu"
              value={formData.menu}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter menu details..."
              required
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Time of Delivery" required>
              <input
                type="time"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </FormField>

            <FormField label="Total Number of Pilgrims" required>
              <input
                type="number"
                name="totalPilgrims"
                value={formData.totalPilgrims}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </FormField>

            <FormField label="Total Meals Served" required>
              <input
                type="number"
                name="totalMealsServed"
                value={formData.totalMealsServed}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </FormField>

            <FormField label="Shortfall">
              <input
                type="number"
                name="shortfall"
                value={formData.shortfall}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                disabled
              />
            </FormField>
          </div>
        </FormSection>

        <FormSection title="Quality Assessment">
          <FormField label="Quantity of food served per pilgrim">
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="quantityAdequate"
                  value="adequate"
                  checked={formData.quantityAdequate === 'adequate'}
                  onChange={handleChange}
                  className="form-radio text-green-600"
                />
                <span className="ml-2">Adequate</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="quantityAdequate"
                  value="inadequate"
                  checked={formData.quantityAdequate === 'inadequate'}
                  onChange={handleChange}
                  className="form-radio text-red-600"
                />
                <span className="ml-2">Inadequate</span>
              </label>
            </div>
          </FormField>

          <FormField label="Quality of food served">
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="qualityAdequate"
                  value="adequate"
                  checked={formData.qualityAdequate === 'adequate'}
                  onChange={handleChange}
                  className="form-radio text-green-600"
                />
                <span className="ml-2">Adequate</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="qualityAdequate"
                  value="inadequate"
                  checked={formData.qualityAdequate === 'inadequate'}
                  onChange={handleChange}
                  className="form-radio text-red-600"
                />
                <span className="ml-2">Inadequate</span>
              </label>
            </div>
          </FormField>

          <FormField label="Provision For Pilgrims on Special Diet">
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="specialDietAdequate"
                  value="adequate"
                  checked={formData.specialDietAdequate === 'adequate'}
                  onChange={handleChange}
                  className="form-radio text-green-600"
                />
                <span className="ml-2">Adequate</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="specialDietAdequate"
                  value="inadequate"
                  checked={formData.specialDietAdequate === 'inadequate'}
                  onChange={handleChange}
                  className="form-radio text-red-600"
                />
                <span className="ml-2">Inadequate</span>
              </label>
            </div>
          </FormField>
        </FormSection>

        <FormSection title="Provisions & Utensils">
          <FormField label="Provisions">
            <div className="mt-2 space-y-2">
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="fruits"
                  checked={formData.provisions.fruits}
                  onChange={handleProvisionChange}
                  className="form-checkbox text-green-600"
                />
                <span className="ml-2">Fresh Fruits</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="water"
                  checked={formData.provisions.water}
                  onChange={handleProvisionChange}
                  className="form-checkbox text-green-600"
                />
                <span className="ml-2">Water</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="juices"
                  checked={formData.provisions.juices}
                  onChange={handleProvisionChange}
                  className="form-checkbox text-green-600"
                />
                <span className="ml-2">Juices</span>
              </label>
            </div>
          </FormField>

          <FormField label="Provision of Eating and Drinking Utensils">
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="utensilsAdequate"
                  value="adequate"
                  checked={formData.utensilsAdequate === 'adequate'}
                  onChange={handleChange}
                  className="form-radio text-green-600"
                />
                <span className="ml-2">Adequate</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="utensilsAdequate"
                  value="inadequate"
                  checked={formData.utensilsAdequate === 'inadequate'}
                  onChange={handleChange}
                  className="form-radio text-red-600"
                />
                <span className="ml-2">Inadequate</span>
              </label>
            </div>
          </FormField>
        </FormSection>

        <FormSection title="Hygiene Status">
          <FormField label="Sufra (Nylon sheet)">
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hygieneStatus.sufra"
                  value="adequate"
                  checked={formData.hygieneStatus.sufra === 'adequate'}
                  onChange={handleChange}
                  className="form-radio text-green-600"
                />
                <span className="ml-2">Adequate</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hygieneStatus.sufra"
                  value="inadequate"
                  checked={formData.hygieneStatus.sufra === 'inadequate'}
                  onChange={handleChange}
                  className="form-radio text-red-600"
                />
                <span className="ml-2">Inadequate</span>
              </label>
            </div>
          </FormField>

          <FormField label="Disposal of leftovers/waste">
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hygieneStatus.wasteDisposal"
                  value="adequate"
                  checked={formData.hygieneStatus.wasteDisposal === 'adequate'}
                  onChange={handleChange}
                  className="form-radio text-green-600"
                />
                <span className="ml-2">Adequate</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="hygieneStatus.wasteDisposal"
                  value="inadequate"
                  checked={formData.hygieneStatus.wasteDisposal === 'inadequate'}
                  onChange={handleChange}
                  className="form-radio text-red-600"
                />
                <span className="ml-2">Inadequate</span>
              </label>
            </div>
          </FormField>
        </FormSection>

        <FormSection title="Additional Information">
          <FormField label="Remarks">
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter any additional remarks or observations..."
            />
          </FormField>
        </FormSection>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => setFormData(initialFormData)}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Submit Assessment'}
          </button>
        </div>
      </form>
    </div>
  );
}