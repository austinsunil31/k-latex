import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/login-response.model';

export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF' | 'VIEWER';

interface User {
  username: string;
  password: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/api/auth`;
  private users: User[] = [
    { username: 'admin', password: 'admin123', role: 'ADMIN' },
    { username: 'manager', password: 'manager123', role: 'MANAGER' },
    { username: 'staff', password: 'staff123', role: 'STAFF' },
    { username: 'viewer', password: 'viewer123', role: 'VIEWER' },
  ];

  private currentUser: LoginResponse | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap((response) => {
          if (response.statusCode === 200 && response.isActive) {
            this.currentUser = response;
            localStorage.setItem('currentUser', JSON.stringify(response));
          }
        })
      );
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
