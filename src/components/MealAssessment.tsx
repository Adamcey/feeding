import React from 'react';
import { ClipboardList, Clock, Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MealReview from './MealReview';

interface ReviewData {
  foodQuality: 'Adequate' | 'Inadequate';
  foodQuantity: 'Adequate' | 'Inadequate';
  specialDiet: 'Adequate' | 'Inadequate';
  utensils: 'Adequate' | 'Inadequate';
  decision: 'Approve' | 'Reject';
  remarks: string;
}

const assessmentData = [
  {
    location: 'FCT',
    accommodationName: 'Ibn Umar',
    caterer: 'Ava Kitchen',
    mealType: 'Lunch',
    deliveryTime: '14:44:00',
    served: '33/33',
    reviews: {
      state: 'Pending',
      kitchen: 'Approved'
    }
  },
  {
    location: 'Lagos',
    accommodationName: 'Al Safwah Royale Orchid',
    caterer: 'Royal Kitchen',
    mealType: 'Breakfast',
    deliveryTime: '07:30:00',
    served: '45/50',
    reviews: {
      state: 'Approved',
      kitchen: 'Approved'
    }
  },
  {
    location: 'Kano',
    accommodationName: 'Anjum Hotel',
    caterer: 'Al-Safa Catering',
    mealType: 'Dinner',
    deliveryTime: '19:15:00',
    served: '58/60',
    reviews: {
      state: 'Rejected',
      kitchen: 'Pending'
    }
  },
  {
    location: 'FCT',
    accommodationName: 'Le Meridien',
    caterer: 'Madina Foods',
    mealType: 'Lunch',
    deliveryTime: '13:00:00',
    served: '40/40',
    reviews: {
      state: 'Approved',
      kitchen: 'Approved'
    }
  },
  {
    location: 'Kaduna',
    accommodationName: 'Mina Al Waha',
    caterer: 'Barakah Kitchen',
    mealType: 'Dinner',
    deliveryTime: '18:30:00',
    served: '75/80',
    reviews: {
      state: 'Pending',
      kitchen: 'Approved'
    }
  },
  {
    location: 'Rivers',
    accommodationName: 'Jabal Omar',
    caterer: 'Al-Baraka Foods',
    mealType: 'Breakfast',
    deliveryTime: '06:45:00',
    served: '90/90',
    reviews: {
      state: 'Approved',
      kitchen: 'Approved'
    }
  },
  {
    location: 'Sokoto',
    accommodationName: 'Dar Al Tawhid',
    caterer: 'Rahma Catering',
    mealType: 'Lunch',
    deliveryTime: '12:15:00',
    served: '65/70',
    reviews: {
      state: 'Rejected',
      kitchen: 'Rejected'
    }
  },
  {
    location: 'Katsina',
    accommodationName: 'Al Safwah Tower',
    caterer: 'Zamzam Kitchen',
    mealType: 'Dinner',
    deliveryTime: '19:00:00',
    served: '55/55',
    reviews: {
      state: 'Pending',
      kitchen: 'Pending'
    }
  },
  {
    location: 'Borno',
    accommodationName: 'Hilton Suites',
    caterer: 'Al-Madina Foods',
    mealType: 'Breakfast',
    deliveryTime: '07:00:00',
    served: '85/85',
    reviews: {
      state: 'Approved',
      kitchen: 'Pending'
    }
  },
  {
    location: 'Oyo',
    accommodationName: 'Swissotel Al Maqam',
    caterer: 'Taiba Kitchen',
    mealType: 'Lunch',
    deliveryTime: '13:30:00',
    served: '120/125',
    reviews: {
      state: 'Pending',
      kitchen: 'Approved'
    }
  },
  {
    location: 'Plateau',
    accommodationName: 'Le Meridien Towers',
    caterer: 'Al-Safwah Catering',
    mealType: 'Dinner',
    deliveryTime: '20:00:00',
    served: '95/100',
    reviews: {
      state: 'Rejected',
      kitchen: 'Pending'
    }
  },
  {
    location: 'Kwara',
    accommodationName: 'Movenpick Hotel',
    caterer: 'Rahma Foods',
    mealType: 'Breakfast',
    deliveryTime: '06:30:00',
    served: '78/80',
    reviews: {
      state: 'Approved',
      kitchen: 'Approved'
    }
  },
  {
    location: 'Edo',
    accommodationName: 'Dar Al Ghufran',
    caterer: 'Makkah Kitchen',
    mealType: 'Lunch',
    deliveryTime: '12:45:00',
    served: '110/110',
    reviews: {
      state: 'Pending',
      kitchen: 'Rejected'
    }
  },
  {
    location: 'Niger',
    accommodationName: 'Hyatt Regency',
    caterer: 'Al-Baraka Catering',
    mealType: 'Dinner',
    deliveryTime: '19:45:00',
    served: '88/90',
    reviews: {
      state: 'Approved',
      kitchen: 'Pending'
    }
  },
  {
    location: 'FCT',
    accommodationName: 'Al Safwah Royal Orchid',
    caterer: 'Madina Foods',
    mealType: 'Breakfast',
    deliveryTime: '06:15:00',
    served: '95/100',
    reviews: {
      state: 'Pending',
      kitchen: 'Approved'
    }
  },
  {
    location: 'FCT',
    accommodationName: 'Dar Al Eiman Royal',
    caterer: 'Ava Kitchen',
    mealType: 'Dinner',
    deliveryTime: '19:30:00',
    served: '120/120',
    reviews: {
      state: 'Approved',
      kitchen: 'Approved'
    }
  },
  {
    location: 'FCT',
    accommodationName: 'Swissotel Al Maqam',
    caterer: 'Royal Kitchen',
    mealType: 'Lunch',
    deliveryTime: '12:45:00',
    served: '88/90',
    reviews: {
      state: 'Rejected',
      kitchen: 'Pending'
    }
  },
  {
    location: 'FCT',
    accommodationName: 'Hilton Suites',
    caterer: 'Al-Safa Catering',
    mealType: 'Breakfast',
    deliveryTime: '07:00:00',
    served: '75/75',
    reviews: {
      state: 'Pending',
      kitchen: 'Rejected'
    }
  },
  {
    location: 'FCT',
    accommodationName: 'Le Meridien Towers',
    caterer: 'Madina Foods',
    mealType: 'Dinner',
    deliveryTime: '20:15:00',
    served: '110/110',
    reviews: {
      state: 'Approved',
      kitchen: 'Pending'
    }
  },
  {
    location: 'FCT',
    accommodationName: 'Makkah Royal Hotel',
    caterer: 'Ava Kitchen',
    mealType: 'Breakfast',
    deliveryTime: '06:30:00',
    served: '150/150',
    reviews: {
      state: 'Approved',
      kitchen: 'Approved'
    }
  },
  {
    location: 'FCT',
    accommodationName: 'Al Safwah Towers',
    caterer: 'Ava Kitchen',
    mealType: 'Dinner',
    deliveryTime: '19:45:00',
    served: '85/90',
    reviews: {
      state: 'Pending',
      kitchen: 'Approved'
    }
  },
  {
    location: 'FCT',
    accommodationName: 'Dar Al Tawhid',
    caterer: 'Ava Kitchen',
    mealType: 'Lunch',
    deliveryTime: '13:15:00',
    served: '110/110',
    reviews: {
      state: 'Rejected',
      kitchen: 'Pending'
    }
  },
  {
    location: 'FCT',
    accommodationName: 'Anjum Hotel',
    caterer: 'Ava Kitchen',
    mealType: 'Breakfast',
    deliveryTime: '07:15:00',
    served: '95/100',
    reviews: {
      state: 'Pending',
      kitchen: 'Rejected'
    }
  },
  {
    location: 'FCT',
    accommodationName: 'Swissotel Makkah',
    caterer: 'Ava Kitchen',
    mealType: 'Dinner',
    deliveryTime: '20:00:00',
    served: '120/120',
    reviews: {
      state: 'Approved',
      kitchen: 'Pending'
    }
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Approved':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'Rejected':
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-orange-500" />;
  }
};

export default function MealAssessment() {
  const [selectedAssessment, setSelectedAssessment] = React.useState<any>(null);
  const { user } = useAuth();
  const location = useLocation();
  const isStateRep = user?.role === 'State Representative';
  const isKitchenRep = user?.role === 'Kitchen Representative';
  const isNahconStaff = user?.role === 'NAHCON Staff';

  const filteredAssessments = assessmentData.filter(assessment => {
    if (isStateRep) {
      return assessment.location === user?.state;
    }
    if (isKitchenRep) {
      return assessment.caterer === user?.kitchen;
    }
    return true;
  });

  const handleReviewSubmit = (reviewData: ReviewData) => {
    console.log('Review submitted:', reviewData);
    setSelectedAssessment(null);
  };

  return (
    <div className="space-y-6">
      {selectedAssessment && (
        <MealReview
          assessment={selectedAssessment}
          onClose={() => setSelectedAssessment(null)}
          onSubmit={handleReviewSubmit}
        />
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Meal Assessments</h1>
        {isNahconStaff && (
          <Link
            to="/meals/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Assessment
          </Link>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ClipboardList className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-medium text-gray-900">Assessment Records</h2>
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAssessments.map((assessment, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{assessment.location}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{assessment.accommodationName}</p>
                    <p className="text-sm text-gray-500">Caterer: {assessment.caterer}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{assessment.mealType}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Delivery: {assessment.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{assessment.served} served</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-${assessment.reviews.state === 'Pending' ? 'orange' : assessment.reviews.state === 'Approved' ? 'green' : 'red'}-500`}>
                        {getStatusIcon(assessment.reviews.state)}
                        {assessment.reviews.state === 'Pending' ? 'Pending Reviews' : `${assessment.reviews.state} by State`}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">State:</span>
                      <span className={`ml-1 text-${assessment.reviews.state === 'Pending' ? 'orange' : assessment.reviews.state === 'Approved' ? 'green' : 'red'}-500`}>
                        {assessment.reviews.state}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Kitchen:</span>
                      <span className={`ml-1 text-${assessment.reviews.kitchen === 'Pending' ? 'orange' : assessment.reviews.kitchen === 'Approved' ? 'green' : 'red'}-500`}>
                        {assessment.reviews.kitchen}
                      </span>
                    </div>
                    {((isStateRep && assessment.reviews.state === 'Pending') ||
                      (isKitchenRep && assessment.reviews.kitchen === 'Pending')) && (
                      <button
                        onClick={() => setSelectedAssessment(assessment)}
                        className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700"
                      >
                        Review
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}