import React, { createContext, useContext, useState } from 'react';
import { User, UserFormData, UserContextType } from '../types/user';
import { useAudit } from './AuditContext';
import { useAuth } from './AuthContext';
import { mockUsers } from '../lib/mockData';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [loading, setLoading] = useState(false);
  const { logAction } = useAudit();
  const { user: currentUser } = useAuth();

  const addUser = async (userData: UserFormData) => {
    try {
      const newUser: User = {
        ...userData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setUsers(prev => [newUser, ...prev]);
      
      logAction(
        'User Creation',
        'user_management',
        `Created new user: ${userData.email}`,
        currentUser ? { email: currentUser.email, role: currentUser.role } : undefined
      );
      
      return newUser;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  };

  const updateUser = async (id: string, userData: UserFormData) => {
    try {
      setUsers(prev => prev.map(user => 
        user.id === id ? { ...user, ...userData, updated_at: new Date().toISOString() } : user
      ));
      
      logAction(
        'User Update',
        'user_management',
        `Updated user: ${userData.email}`,
        currentUser ? { email: currentUser.email, role: currentUser.role } : undefined
      );
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const deleteUser = async (user: User) => {
    try {
      setUsers(prev => prev.filter(u => u.id !== user.id));
      
      logAction(
        'User Deletion',
        'user_management',
        `Deleted user: ${user.email}`,
        currentUser ? { email: currentUser.email, role: currentUser.role } : undefined
      );
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  const getUser = async (id: string) => {
    return users.find(u => u.id === id);
  };

  return (
    <UserContext.Provider value={{ users, loading, addUser, updateUser, deleteUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}