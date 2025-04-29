export interface User {
  name: string;
  email: string;
  role: string;
  state: string;
  kitchen: string;
}

export interface Role {
  name: string;
  privileges: string[];
}

export interface MealRequest {
  id: string;
  state: string;
  kitchen: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  menu: string;
  deliveryDateTime: string;
  totalPilgrims: number;
  specialDietCount: number;
  specialDietDetails: string;
  additionalNotes: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Delivered';
  createdAt: string;
  updatedAt: string;
}

export interface MealAssessment {
  location: string;
  mealDetails: {
    name: string;
    caterer: string;
  };
  assessmentStatus: {
    type: 'Breakfast' | 'Lunch' | 'Dinner';
    delivery: string;
    served: string;
    shortfall: number;
  };
  status: {
    state: 'Pending' | 'Approved' | 'Rejected';
    kitchen: 'Pending' | 'Approved' | 'Rejected';
  };
}

export interface AssessmentReview {
  state: string;
  accommodation: string;
  mealType: string;
  deliveryTime: string;
  foodQuality: 'Adequate' | 'Inadequate';
  foodQuantity: 'Adequate' | 'Inadequate';
  specialDiet: 'Adequate' | 'Inadequate';
  utensils: 'Adequate' | 'Inadequate';
  menu: string;
  provisions: string[];
  decision: 'Approve' | 'Reject';
  remarks: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  userRole: string;
  action: string;
  category: 'authentication' | 'meal_assessment' | 'user_management' | 'settings' | 'meal_request';
  details: string;
  ipAddress?: string;
}