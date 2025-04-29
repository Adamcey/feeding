import React from 'react';
import { ClipboardList, Settings, Users, BarChart3, LogOut, History, UtensilsCrossed } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Logo } from './Logo';

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
};

const navItems: NavItem[] = [
  { 
    label: 'User Management', 
    path: '/users', 
    icon: <Users className="w-5 h-5" />,
    roles: ['Administrator']
  },
  { 
    label: 'Meal Assessment', 
    path: '/meals', 
    icon: <ClipboardList className="w-5 h-5" />,
    roles: ['Administrator', 'NAHCON Staff', 'State Representative', 'Kitchen Representative']
  },
  {
    label: 'Meal Requests',
    path: '/meal-requests',
    icon: <UtensilsCrossed className="w-5 h-5" />,
    roles: ['State Representative']
  },
  {
    label: 'Kitchen Requests',
    path: '/kitchen-requests',
    icon: <UtensilsCrossed className="w-5 h-5" />,
    roles: ['Kitchen Representative']
  },
  { 
    label: 'Reports', 
    path: '/reports', 
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['Administrator', 'NAHCON Staff', 'State Representative', 'Kitchen Representative']
  },
  { 
    label: 'Settings', 
    path: '/settings', 
    icon: <Settings className="w-5 h-5" />,
    roles: ['Administrator']
  },
  {
    label: 'Audit Log',
    path: '/audit',
    icon: <History className="w-5 h-5" />,
    roles: ['Administrator']
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Logo className="w-12 h-12" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">NAHCON FMS</h1>
                <p className="text-sm text-gray-500">Feeding Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">User</p>
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              </div>
              <button 
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
          <nav className="mt-4">
            <ul className="flex space-x-8">
              {navItems.filter(item => item.roles.includes(user?.role || '')).map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.path
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}