import React from 'react';
import { X } from 'lucide-react';
import { UserForm } from './UserForm';
import { User, UserFormData } from '../../types/user';

interface UserModalProps {
  user?: User;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
}

export function UserModal({ user, onClose, onSubmit }: UserModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {user ? 'Edit User' : 'Create New User'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <UserForm
          initialData={user}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}