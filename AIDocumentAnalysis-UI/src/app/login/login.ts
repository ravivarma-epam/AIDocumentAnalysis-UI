import { Component, OnInit } from '@angular/core'; // Import OnInit
import { Router } from '@angular/router';
import { 
  SocialAuthService, 
  SocialUser, 
  GoogleSigninButtonModule // <--- 1. Import this module
} from '@abacritt/angularx-social-login';
import { AidaService } from '../services/aida-service';
import { ConfigService } from '../services/config-service';
import { Constants } from '../constants';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'login-page',
  // 2. Add GoogleSigninButtonModule to imports
  imports: [GoogleSigninButtonModule], 
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  user: SocialUser | null = null;
  errorMessage = '';
  private loginInProgress = false;

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private aida: AidaService,
    private config: ConfigService,
    private session: AuthService
  ) {}

  ngOnInit() {
    if (this.session.isAuthenticated()) {
      void this.router.navigate(['/home']);
      return;
    }

    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (user?.idToken) {
        this.handleLoginSuccess(user);
      }
    });
  }
  
  handleLoginSuccess(user: SocialUser) {
    if (this.loginInProgress) {
      return;
    }

    this.loginInProgress = true;
    this.errorMessage = '';
    this.aida.login(`${this.config.getaidaUrl()}${Constants.loginUrl}`, {
      id_token: user.idToken
    }).subscribe({
      next: (res) => {
         if (!res.accessToken) {
           this.errorMessage = 'The API did not return an access token.';
           this.loginInProgress = false;
           return;
         }
         this.session.setToken(res.accessToken);
         this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loginInProgress = false;
        this.errorMessage = err.status === 0
          ? 'Cannot reach the API. Confirm the backend is running on https://localhost:7030.'
          : err.error?.message ?? 'Google login was rejected by the API.';
        console.error(err);
      }
    });
  }
}