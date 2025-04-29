export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  state: string;
  kitchen: string;
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
}

export type UserFormData = Omit<User, 'id' | 'created_at' | 'updated_at'>;

export interface UserContextType {
  users: User[];
  loading: boolean;
  addUser: (user: UserFormData) => Promise<void>;
  updateUser: (id: string, user: UserFormData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  getUser: (id: string) => Promise<User | undefined>;
}