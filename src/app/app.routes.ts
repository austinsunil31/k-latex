import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [

      // DASHBOARD → ADMIN + MANAGER
      {
        path: 'dashboard',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'MANAGER'] },
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes')
            .then(m => m.DASHBOARD_ROUTES)
      },

      // INVENTORY → ADMIN + MANAGER + STAFF + VIEWER
      {
        path: 'inventory',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'MANAGER', 'STAFF', 'VIEWER'] },
        loadChildren: () =>
          import('./features/inventory/inventory.routes')
            .then(m => m.INVENTORY_ROUTES)
      },

      // USERS → ADMIN + VIEWER
      {
        path: 'users',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN', 'VIEWER'] },
        loadChildren: () =>
          import('./features/users/users.routes')
            .then(m => m.USERS_ROUTES)
      },

      // REPORTS → ADMIN ONLY
      {
        path: 'reports',
        canActivate: [roleGuard],
        data: { roles: ['ADMIN'] },
        loadChildren: () =>
          import('./features/reports/reports.routes')
            .then(m => m.REPORTS_ROUTES)
      }
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

