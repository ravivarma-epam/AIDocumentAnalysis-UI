import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { 
  SocialAuthServiceConfig, 
  SocialLoginModule,
  GoogleLoginProvider 
} from '@abacritt/angularx-social-login';

import { routes } from './app.routes';
import { ConfigService } from './services/config-service';
import { authInterceptor } from './services/auth-interceptor';

export function initConfig(configService: ConfigService) {
  return () => configService.loadConfig();
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(() => {
        const configService = inject(ConfigService);
        return configService.loadConfig();
    }),
    importProvidersFrom(SocialLoginModule),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '183069032962-u6rgtmoe7f0cvfjbhiqdtsiabrfl0fd3.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    }
  ]
};