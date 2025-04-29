import React from 'react';
import { X } from 'lucide-react';
import { RoleForm } from './RoleForm';
import { Role, RoleFormData } from '../../types/role';

interface RoleModalProps {
  role?: Role;
  onClose: () => void;
  onSubmit: (data: RoleFormData) => void;
}

export function RoleModal({ role, onClose, onSubmit }: RoleModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {role ? 'Edit Role' : 'Create New Role'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <RoleForm
          initialData={role}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}