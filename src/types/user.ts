
export type UserType = {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'subscriber';
}
