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
import { ViewClientComponent } from './pages/view-client/view-client.component';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { ViewInventoryComponent } from './pages/view-inventory/view-inventory.component';
import { ViewOrderComponent } from './pages/view-order/view-order.component';
import { OrderDetailsComponent } from './views/order-details/order-details.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app', component: AppDashboardComponent, canActivate: [AuthGuard] },
  { path: 'app/clients', component: ClientManagementComponent, canActivate: [AuthGuard] },
  { path: 'app/products', component: ProductManagementComponent, canActivate: [AuthGuard] },
  { path: 'app/inventory', component: InventoryManagementComponent, canActivate: [AuthGuard] },
  { path: 'app/orders', component: OrderManagementComponent, canActivate: [AuthGuard] },
  { path: 'app/clients/create', component: CreateClientComponent, canActivate: [AuthGuard] },
  { path: 'app/products/create', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'app/inventory/create', component: CreateInventoryComponent, canActivate: [AuthGuard] },
  { path: 'app/orders/create', component: CreateOrderComponent, canActivate: [AuthGuard] },
  { path: 'app/clients/view', component: ViewClientComponent, canActivate: [AuthGuard] },
  { path: 'app/products/view', component: ViewProductComponent, canActivate: [AuthGuard] },
  { path: 'app/inventory/view', component: ViewInventoryComponent, canActivate: [AuthGuard] },
  { path: 'app/orders/view', component: ViewOrderComponent, canActivate: [AuthGuard] },
  { path: 'app/order-details/:orderId', component: OrderDetailsComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];
