import React, { createContext, useContext } from 'react';
import { AuditLog } from '../types';
import { mockAuditLogs } from '../data/mockAuditData';

interface AuditContextType {
  logAction: (action: string, category: AuditLog['category'], details: string, user?: { email: string; role: string }) => void;
  getAuditLogs: () => AuditLog[];
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

// Mock storage for audit logs
let auditLogs: AuditLog[] = [...mockAuditLogs];

export function AuditProvider({ children }: { children: React.ReactNode }) {
  const logAction = (action: string, category: AuditLog['category'], details: string, user?: { email: string; role: string }) => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        user = JSON.parse(storedUser);
      } else {
        console.warn('No user provided for audit log');
        return;
      }
    }

    const newLog: AuditLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      userId: user.email,
      userEmail: user.email,
      userRole: user.role,
      action,
      category,
      details,
    };

    auditLogs = [newLog, ...auditLogs];
    console.log('Audit log created:', newLog);
  };

  const getAuditLogs = () => {
    return auditLogs;
  };

  return (
    <AuditContext.Provider value={{ logAction, getAuditLogs }}>
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error('useAudit must be used within an AuditProvider');
  }
  return context;
}