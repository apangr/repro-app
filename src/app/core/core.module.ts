import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NgModule,
  Optional,
  SkipSelf,
  ErrorHandler,
  APP_INITIALIZER,
  LOCALE_ID,
} from '@angular/core';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthService } from './services/auth.service';
import { I18nService } from './services/i18n.service';
import { JwtService } from './services/jwt.service';
import { LocalStorageService } from './services/local-storage.service';
import { MetaTagsService } from './services/meta-tags.service';
import { NotificationService } from './services/notification.service';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular-ivy';
import { ModalService } from './services/modal.service';
import { ProfileService } from './services/profile.service';
import { SplashScreenService } from './services/splash-screen.service';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { MenuSidebarService } from './services/menu-sidebar.service';

import {
  FacebookLoginProvider,
  GoogleInitOptions,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { environment } from '@env/environment';
import { LangInterceptor } from './interceptors/lang.interceptor';

registerLocaleData(localeEn);
registerLocaleData(localeEs);

const googleLoginOptions: GoogleInitOptions = {
  oneTapEnabled: false, // default is true
  prompt: 'consent',
  scopes: [
    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/youtube.force-ssl',
    'https://www.googleapis.com/auth/youtube.readonly',
  ],
};

const fbLoginOptions = {
  scope: 'email,publish_video',
  return_scopes: true,
  enable_profile_selector: true,
  auth_type: 'reauthenticate',
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
@NgModule({
  providers: [
    /*SERVICES*/
    SplashScreenService,
    I18nService,
    LocalStorageService,
    MetaTagsService,
    AuthService,
    JwtService,
    NotificationService,
    ProfileService,
    ModalService,
    MenuSidebarService,

    /* GUARDS */
    IsAuthenticatedGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              environment.social.facebookClientId,
              fbLoginOptions
            ),
          },
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.social.googleClientId,
              googleLoginOptions
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    { provide: LOCALE_ID, useValue: 'en-US' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LangInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('You shall not run!');
    }
  }
}
