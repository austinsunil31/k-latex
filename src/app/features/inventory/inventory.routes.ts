import { Routes } from '@angular/router';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';
import { StockInComponent } from './stock-in/stock-in.component';
import { StockOutComponent } from './stock-out/stock-out.component';

export const INVENTORY_ROUTES: Routes = [
  {
    path: '',
    component: StockInComponent
  },
  {
    path: 'inventory-home',
    component: InventoryHomeComponent
  },
  {
    path: 'stock-out',
    component: StockOutComponent
  }
];
