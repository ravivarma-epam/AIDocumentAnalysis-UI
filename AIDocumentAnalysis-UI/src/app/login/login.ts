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

@Component({
  selector: 'login-page',
  // 2. Add GoogleSigninButtonModule to imports
  imports: [GoogleSigninButtonModule], 
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  user: SocialUser | null = null;

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private aida: AidaService,
    private config: ConfigService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.handleLoginSuccess(user);
    });
  }
  
  handleLoginSuccess(user: SocialUser) {
    this.aida.login(`${this.config.getaidaUrl()}${Constants.loginUrl}`, {
      id_token: user.idToken
    }).subscribe({
      next: (res) => {
         this.router.navigate(['/home']);
      },
      error: (err) => console.error(err)
    });
  }
}