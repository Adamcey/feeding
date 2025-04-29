import { User, Role, MealRequest } from '../types';

export const mockUsers: User[] = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'System Administrator',
    email: 'admin@nahcon.gov.ng',
    role: 'Administrator',
    state: 'All',
    kitchen: 'All',
    status: 'Active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '1',
    name: 'NAHCON Staff',
    email: 'staff@nahcon.gov.ng',
    role: 'NAHCON Staff',
    state: 'All',
    kitchen: 'All',
    status: 'Active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'FCT Representative',
    email: 'fct@nahcon.gov.ng',
    role: 'State Representative',
    state: 'FCT',
    kitchen: 'All',
    status: 'Active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Ava Kitchen Rep',
    email: 'ava@kitchen.com',
    role: 'Kitchen Representative',
    state: 'All',
    kitchen: 'Ava Kitchen',
    status: 'Active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access and management capabilities',
    privileges: [
      'Full system access',
      'User management',
      'Settings management',
      'View reports',
      'Add meal assessments',
      'Review meal assessments',
      'Manage meal assessments'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'NAHCON Staff',
    description: 'Staff members with assessment capabilities',
    privileges: [
      'Add meal assessments',
      'View own submissions',
      'View reports',
      'Review own assessments'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'State Representative',
    description: 'State representatives for meal assessment',
    privileges: [
      'View state reports',
      'Review meal assessments',
      'View own submissions'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Kitchen Representative',
    description: 'Kitchen representatives for meal assessment',
    privileges: [
      'View kitchen reports',
      'Review meal assessments',
      'View own submissions'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Helper function to generate dates within a range
function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate mock meal requests
export const mockMealRequests: MealRequest[] = [
  {
    id: '1',
    state: 'FCT',
    kitchen: 'Ava Kitchen',
    mealType: 'Breakfast',
    menu: 'Bread, eggs, beans, tea, fruits',
    deliveryDateTime: getRandomDate(new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).toISOString(),
    totalPilgrims: 150,
    specialDietCount: 5,
    specialDietDetails: 'Diabetic meals required',
    additionalNotes: 'Please ensure hot tea is served',
    status: 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    state: 'FCT',
    kitchen: 'Ava Kitchen',
    mealType: 'Lunch',
    menu: 'Rice, chicken, vegetables, fruit juice',
    deliveryDateTime: getRandomDate(new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).toISOString(),
    totalPilgrims: 150,
    specialDietCount: 3,
    specialDietDetails: 'Vegetarian meals needed',
    additionalNotes: 'Extra water bottles required',
    status: 'Approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    state: 'FCT',
    kitchen: 'Ava Kitchen',
    mealType: 'Dinner',
    menu: 'Jollof rice, fish, salad, dessert',
    deliveryDateTime: getRandomDate(new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).toISOString(),
    totalPilgrims: 145,
    specialDietCount: 4,
    specialDietDetails: 'Gluten-free meals required',
    additionalNotes: 'Please provide disposable cutlery',
    status: 'Delivered',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    state: 'FCT',
    kitchen: 'Ava Kitchen',
    mealType: 'Breakfast',
    menu: 'Pap, akara, bread, tea, fruits',
    deliveryDateTime: getRandomDate(new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).toISOString(),
    totalPilgrims: 155,
    specialDietCount: 6,
    specialDietDetails: 'Low-sodium meals required',
    additionalNotes: 'Include honey with tea',
    status: 'Rejected',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    state: 'FCT',
    kitchen: 'Ava Kitchen',
    mealType: 'Lunch',
    menu: 'Fried rice, beef, coleslaw, fruit juice',
    deliveryDateTime: getRandomDate(new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).toISOString(),
    totalPilgrims: 152,
    specialDietCount: 4,
    specialDietDetails: 'Dairy-free meals required',
    additionalNotes: 'Include extra servings of fruits',
    status: 'Approved',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];