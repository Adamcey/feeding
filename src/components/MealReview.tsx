import React, { useState } from 'react';
import { FormSection } from './common/FormSection';
import { FormField } from './common/FormField';
import { Check, X, CheckCircle, XCircle } from 'lucide-react';

interface MealReviewProps {
  assessment: {
    location: string;
    accommodationName: string;
    mealType: string;
    deliveryTime: string;
    menu?: string;
    served: string;
  };
  onClose: () => void;
  onSubmit: (review: ReviewData) => void;
}

interface ReviewData {
  foodQuality: 'Adequate' | 'Inadequate';
  foodQuantity: 'Adequate' | 'Inadequate';
  specialDiet: 'Adequate' | 'Inadequate';
  utensils: 'Adequate' | 'Inadequate';
  decision: 'Approve' | 'Reject';
  remarks: string;
}

export default function MealReview({ assessment, onClose, onSubmit }: MealReviewProps) {
  const [reviewData, setReviewData] = useState<ReviewData>({
    foodQuality: 'Adequate',
    foodQuantity: 'Adequate',
    specialDiet: 'Adequate',
    utensils: 'Adequate',
    decision: 'Approve',
    remarks: '',
  });

  const QualityIndicator = ({ value }: { value: 'Adequate' | 'Inadequate' }) => (
    <div className={`flex items-center ${value === 'Adequate' ? 'text-green-600' : 'text-red-600'}`}>
      {value === 'Adequate' ? (
        <CheckCircle className="w-5 h-5 mr-2" />
      ) : (
        <XCircle className="w-5 h-5 mr-2" />
      )}
      {value}
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(reviewData);
  };

  const handleRadioChange = (field: keyof ReviewData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setReviewData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">State Assessment Review</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Assessment Details">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="State">
                <p className="mt-1 text-sm text-gray-900">{assessment.location}</p>
              </FormField>
              <FormField label="Accommodation">
                <p className="mt-1 text-sm text-gray-900">{assessment.accommodationName}</p>
              </FormField>
              <FormField label="Meal Type">
                <p className="mt-1 text-sm text-gray-900">{assessment.mealType}</p>
              </FormField>
              <FormField label="Delivery Time">
                <p className="mt-1 text-sm text-gray-900">{assessment.deliveryTime}</p>
              </FormField>
            </div>
          </FormSection>

          <FormSection title="Quality Assessment">
            <div className="grid grid-cols-2 gap-6">
              <FormField label="Food Quality">
                <div className="mt-2">
                  <QualityIndicator value={reviewData.foodQuality} />
                </div>
              </FormField>

              <FormField label="Food Quantity">
                <div className="mt-2">
                  <QualityIndicator value={reviewData.foodQuantity} />
                </div>
              </FormField>

              <FormField label="Special Diet Provisions">
                <div className="mt-2">
                  <QualityIndicator value={reviewData.specialDiet} />
                </div>
              </FormField>

              <FormField label="Utensils">
                <div className="mt-2">
                  <QualityIndicator value={reviewData.utensils} />
                </div>
              </FormField>
            </div>
          </FormSection>

          <FormSection title="Decision">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="decision"
                    value="Approve"
                    checked={reviewData.decision === 'Approve'}
                    onChange={handleRadioChange('decision')}
                    className="form-radio text-green-600"
                  />
                  <span className="ml-2 flex items-center text-green-600">
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="decision"
                    value="Reject"
                    checked={reviewData.decision === 'Reject'}
                    onChange={handleRadioChange('decision')}
                    className="form-radio text-red-600"
                  />
                  <span className="ml-2 flex items-center text-red-600">
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </span>
                </label>
              </div>

              <FormField label="Remarks">
                <textarea
                  value={reviewData.remarks}
                  onChange={(e) => setReviewData(prev => ({ ...prev, remarks: e.target.value }))}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter any additional remarks or observations..."
                />
              </FormField>
            </div>
          </FormSection>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}