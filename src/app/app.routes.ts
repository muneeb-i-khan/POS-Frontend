import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { AppDashboardComponent } from './pages/app-dashboard/app-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app', component: AppDashboardComponent, canActivate: [AuthGuard] },
];
