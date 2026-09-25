import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect root to login
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [authGuard] }
];