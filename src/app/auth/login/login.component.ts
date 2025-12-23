import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const success = this.authService.login(this.username, this.password);

    if (!success) {
      this.error = 'Invalid username or password';
      return;
    }

    // Role-based redirect
    const role = this.authService.getUserRole();

    if (role === 'ADMIN' || role === 'MANAGER') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/inventory']);
    }
  }
}
