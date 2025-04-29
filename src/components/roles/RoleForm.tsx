import React from 'react';
import { RoleFormData } from '../../types/role';

interface RoleFormProps {
  initialData?: RoleFormData;
  onSubmit: (data: RoleFormData) => void;
  onCancel: () => void;
}

export function RoleForm({ initialData, onSubmit, onCancel }: RoleFormProps) {
  const [formData, setFormData] = React.useState<RoleFormData>(
    initialData || {
      name: '',
      description: '',
      privileges: []
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePrivilegeChange = (privilege: string) => {
    setFormData(prev => ({
      ...prev,
      privileges: prev.privileges.includes(privilege)
        ? prev.privileges.filter(p => p !== privilege)
        : [...prev.privileges, privilege]
    }));
  };

  const availablePrivileges = [
    'Full system access',
    'User management',
    'Settings management',
    'View reports',
    'Add meal assessments',
    'Review meal assessments',
    'Manage meal assessments',
    'View own submissions',
    'Review own assessments',
    'View state reports',
    'Manage state data',
    'View kitchen reports',
    'Manage kitchen data'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Role Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 form-input"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1 form-input"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Privileges
        </label>
        <div className="space-y-2">
          {availablePrivileges.map(privilege => (
            <label key={privilege} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.privileges.includes(privilege)}
                onChange={() => handlePrivilegeChange(privilege)}
                className="form-checkbox h-4 w-4 text-green-600"
              />
              <span className="ml-2 text-sm text-gray-700">{privilege}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialData ? 'Update Role' : 'Create Role'}
        </button>
      </div>
    </form>
  );
}