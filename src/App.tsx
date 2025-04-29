import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuditProvider } from './contexts/AuditContext';
import { AuthProvider } from './contexts/AuthContext';
import { RoleProvider } from './contexts/RoleContext';
import { UserProvider } from './contexts/UserContext';
import Layout from './components/Layout';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import MealAssessment from './components/MealAssessment';
import MealAssessmentForm from './components/MealAssessmentForm';
import MealRequest from './components/MealRequest';
import KitchenMealRequests from './components/KitchenMealRequests';
import Reports from './components/Reports';
import AuditLog from './components/AuditLog';
import Settings from './components/Settings';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children: React.ReactNode;
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    return <Navigate to="/login" />;
  }
  
  const user = JSON.parse(storedUser);
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/meals" />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <AuditProvider>
        <AuthProvider>
          <RoleProvider>
            <UserProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Routes>
                          <Route path="/users" element={<UserManagement />} />
                          <Route 
                            path="/meals/new" 
                            element={
                              <ProtectedRoute allowedRoles={['Administrator', 'NAHCON Staff']}>
                                <MealAssessmentForm />
                              </ProtectedRoute>
                            } 
                          />
                          <Route path="/meals" element={<MealAssessment />} />
                          <Route 
                            path="/meal-requests" 
                            element={
                              <ProtectedRoute allowedRoles={['State Representative']}>
                                <MealRequest />
                              </ProtectedRoute>
                            }
                          />
                          <Route 
                            path="/kitchen-requests" 
                            element={
                              <ProtectedRoute allowedRoles={['Kitchen Representative']}>
                                <KitchenMealRequests />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/reports" element={<Reports />} />
                          <Route 
                            path="/audit" 
                            element={
                              <ProtectedRoute allowedRoles={['Administrator']}>
                                <AuditLog />
                              </ProtectedRoute>
                            } 
                          />
                          <Route path="/" element={<Navigate to="/reports" replace />} />
                        </Routes>
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </UserProvider>
          </RoleProvider>
        </AuthProvider>
      </AuditProvider>
    </Router>
  );
}

export default App;