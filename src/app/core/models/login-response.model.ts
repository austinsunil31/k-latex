export interface LoginResponse {
  userId: number;
  username: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF' | 'VIEWER';
  isActive: boolean;
  message: string;
  statusCode: number;
}
