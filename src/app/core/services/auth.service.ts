import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'VIEWER';

interface User {
  username: string;
  password: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    { username: 'admin',   password: 'admin123',   role: 'ADMIN' },
    { username: 'manager', password: 'manager123', role: 'MANAGER' },
    { username: 'staff',   password: 'staff123',   role: 'STAFF' },
    { username: 'viewer',  password: 'viewer123',  role: 'VIEWER' }
  ];

  private currentUser: User | null = null;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const user = this.users.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  getUserRole(): UserRole | null {
    return this.currentUser?.role ?? null;
  }

  hasRole(roles: UserRole[]): boolean {
    return !!this.currentUser && roles.includes(this.currentUser.role);
  }
}
