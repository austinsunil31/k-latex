import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          switch (res.role) {
            case 'ADMIN':
              this.router.navigate(['/dashboard']);
              break;

            case 'MANAGER':
              this.router.navigate(['/dashboard']);
              break;

            case 'STAFF':
              this.router.navigate(['/inventory']);
              break;

            case 'VIEWER':
              this.router.navigate(['/users']);
              break;

            default:
              this.router.navigate(['/']);
          }
        }
      },
      error: () => {
        alert('Invalid username or password');
      },
    });
  }
}
