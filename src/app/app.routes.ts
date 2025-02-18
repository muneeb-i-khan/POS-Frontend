import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AppDashboardComponent } from './pages/app-dashboard/app-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientManagementComponent } from './pages/client-management/client-management.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { InventoryManagementComponent } from './pages/inventory-management/inventory-management.component';
import { OrderManagementComponent } from './pages/order-management/order-management.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { CreateInventoryComponent } from './pages/create-inventory/create-inventory.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app', component: AppDashboardComponent, canActivate: [AuthGuard] },
  { path: 'app/clients', component: ClientManagementComponent },
  { path: 'app/products', component: ProductManagementComponent },
  { path: 'app/inventory', component: InventoryManagementComponent },
  { path: 'app/orders', component: OrderManagementComponent },
  { path: 'app/clients/create', component: CreateClientComponent },
  { path: 'app/products/create', component: CreateProductComponent },
  { path: 'app/inventory/create', component: CreateInventoryComponent },
  { path: 'app/orders/create', component: CreateOrderComponent }
];
