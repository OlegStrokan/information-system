
export type User = {
  id: string;
  fullName: string;
  isSubscriber: boolean;
  role: 'admin' | 'student';
  userName: string;
}
