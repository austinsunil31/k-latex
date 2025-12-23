import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for ngIf, ngFor
import { RouterModule } from '@angular/router'; // Needed for router-outlet

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    UserLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AdminLayoutComponent,
    UserLayoutComponent
  ]
})
export class LayoutModule {}
