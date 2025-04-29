import React, { createContext, useContext, useState } from 'react';
import { Role, RoleFormData, RoleContextType } from '../types/role';
import { useAudit } from './AuditContext';
import { useAuth } from './AuthContext';
import { mockRoles } from '../lib/mockData';

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [loading, setLoading] = useState(false);
  const { logAction } = useAudit();
  const { user: currentUser } = useAuth();

  const addRole = async (roleData: RoleFormData) => {
    try {
      const newRole: Role = {
        ...roleData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setRoles(prev => [newRole, ...prev]);
      
      logAction(
        'Role Creation',
        'user_management',
        `Created new role: ${roleData.name}`,
        currentUser ? { email: currentUser.email, role: currentUser.role } : undefined
      );
      
      return newRole;
    } catch (error) {
      console.error('Error adding role:', error);
      throw error;
    }
  };

  const updateRole = async (id: string, roleData: RoleFormData) => {
    try {
      setRoles(prev => prev.map(role => 
        role.id === id ? { ...role, ...roleData, updated_at: new Date().toISOString() } : role
      ));
      
      logAction(
        'Role Update',
        'user_management',
        `Updated role: ${roleData.name}`,
        currentUser ? { email: currentUser.email, role: currentUser.role } : undefined
      );
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  };

  const deleteRole = async (role: Role) => {
    try {
      setRoles(prev => prev.filter(r => r.id !== role.id));
      
      logAction(
        'Role Deletion',
        'user_management',
        `Deleted role: ${role.name}`,
        currentUser ? { email: currentUser.email, role: currentUser.role } : undefined
      );
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  };

  const getRole = async (id: string) => {
    return roles.find(r => r.id === id);
  };

  return (
    <RoleContext.Provider value={{ roles, loading, addRole, updateRole, deleteRole, getRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}