export interface Role {
  id: string;
  name: string;
  description: string;
  privileges: string[];
  created_at: string;
  updated_at: string;
}

export type RoleFormData = Omit<Role, 'id' | 'created_at' | 'updated_at'>;

export interface RoleContextType {
  roles: Role[];
  loading: boolean;
  addRole: (role: RoleFormData) => Promise<void>;
  updateRole: (id: string, role: RoleFormData) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  getRole: (id: string) => Promise<Role | undefined>;
}