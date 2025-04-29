import React, { useState } from 'react';
import { Plus, Shield, Users } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { UserList } from './users/UserList';
import { UserModal } from './users/UserModal';
import { RoleList } from './roles/RoleList';
import { RoleModal } from './roles/RoleModal';
import { useRole } from '../contexts/RoleContext';
import { User } from '../types/user';
import { Role } from '../types/role';

export default function UserManagement() {
  const { users, addUser, updateUser, deleteUser } = useUser();
  const { roles, addRole, updateRole, deleteRole } = useRole();
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [selectedRole, setSelectedRole] = useState<Role | undefined>();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Users</h2>
        </div>
        <button 
          onClick={() => {
            setSelectedUser(undefined);
            setShowUserModal(true);
          }}
          className="btn btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </button>
      </div>

      <UserList
        users={users}
        onEdit={(user) => {
          setSelectedUser(user);
          setShowUserModal(true);
        }}
        onDelete={deleteUser}
      />

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Roles</h2>
          </div>
          <button
            onClick={() => {
              setSelectedRole(undefined);
              setShowRoleModal(true);
            }}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Role
          </button>
        </div>
        <RoleList
          roles={roles}
          onEdit={(role) => {
            setSelectedRole(role);
            setShowRoleModal(true);
          }}
          onDelete={deleteRole}
        />
      </div>

      {showUserModal && (
        <UserModal
          user={selectedUser}
          onClose={() => setShowUserModal(false)}
          onSubmit={async (data) => {
            if (selectedUser) {
              await updateUser(selectedUser.id, data);
            } else {
              await addUser(data);
            }
            setShowUserModal(false);
          }}
        />
      )}

      {showRoleModal && (
        <RoleModal
          role={selectedRole}
          onClose={() => setShowRoleModal(false)}
          onSubmit={async (data) => {
            if (selectedRole) {
              await updateRole(selectedRole.id, data);
            } else {
              await addRole(data);
            }
            setShowRoleModal(false);
          }}
        />
      )}
    </div>
  );
}