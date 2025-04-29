import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudit } from './AuditContext';
import { mockUsers } from '../lib/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  state: string;
  kitchen: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { logAction } = useAudit();

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Find the user in mock data
      const mockUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!mockUser) {
        throw new Error('User not found');
      }

      // For testing purposes, use simple password validation
      const isValidPassword = password === 'password123';

      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      logAction(
        'Login', 
        'authentication', 
        `User logged in: ${email}`, 
        { email, role: mockUser.role }
      );
      
      navigate('/reports');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (user) {
        logAction(
          'Logout', 
          'authentication', 
          `User logged out: ${user.email}`, 
          { email: user.email, role: user.role }
        );
      }
      
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}