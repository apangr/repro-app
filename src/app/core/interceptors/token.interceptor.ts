import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  throwError,
  finalize,
  concatMap,
} from 'rxjs';
import { environment } from '@env/environment';
import { JwtService } from '@app/core/services/jwt.service';
import { Store } from '@ngrx/store';
import { AppState, ProfileActions } from '@app/root-store';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  apiUrl = environment.apiUrl;
  private refreshTokenInProgress = new BehaviorSubject<boolean>(false);
  // private requestQueue: HttpRequest<any>[] = [];
  private requestQueue: { request: HttpRequest<any>; observer: any }[] = [];

  constructor(private jwtService: JwtService, private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes(environment.apiUrl)) {
      // Get the tokens from the storage
      const token = this.jwtService.getAccessToken();
      const refreshToken = this.jwtService.getRefreshToken();
      // Check if the request URL is excluded from authentication (e.g., login or refresh token API)
      if (this.isAuthExcluded(request)) {
        return next.handle(request);
      }

      //Check if access and refresh tokens are expired,
      //redirect user to login
      if (
        this.jwtService.isTokenExpired(token) &&
        this.jwtService.isTokenExpired(refreshToken)
      ) {
        this.store.dispatch(ProfileActions.logout());
      }

      //Check if access token are expired, refresh token and continue with the request
      if (this.jwtService.isTokenExpired(token)) {
        if (!this.refreshTokenInProgress.value) {
          this.refreshTokenInProgress.next(true);
          return this.jwtService.refreshToken(refreshToken).pipe(
            concatMap((data) => {
              this.jwtService.saveTokens(data);
              this.processRequestQueue(next);
              return next.handle(this.addAuthorizationHeader(request));
            }),
            catchError((error) => {
              this.store.dispatch(ProfileActions.logout());
              return throwError(() => Error(error));
            }),
            finalize(() => {
              this.refreshTokenInProgress.next(false);
            })
          );
        } else {
          // Other Solution (To Test)
          // return this.refreshTokenInProgress.pipe(
          //   filter(Boolean),
          //   take(1),
          //   concatMap(() => next.handle(this.addAuthorizationHeader(request)))
          // );

          const observable = new Observable<HttpEvent<any>>((observer) => {
            this.requestQueue.push({ request, observer });
          });
          return observable;
        }
      } else {
        return next.handle(this.addAuthorizationHeader(request));
      }
    }
    return next.handle(request);
  }

  private processRequestQueue(next: HttpHandler) {
    for (let i = 0; i < this.requestQueue.length; i++) {
      const item = this.requestQueue[i];
      const originalRequest = item.request;
      const newRequest = this.addAuthorizationHeader(originalRequest);
      item.request = newRequest;
      next.handle(newRequest).subscribe(item.observer);
    }
    this.requestQueue = [];
  }

  private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.jwtService.getAccessToken();
    return request.clone({
      setHeaders: {
        Authorization: `${token}`,
      },
    });
  }

  private isAuthExcluded(request: HttpRequest<any>): boolean {
    const operation = request.body ? request.body.operationName : '';
    if (
      operation === 'refreshToken' ||
      operation === 'login' ||
      operation === 'validateIdentifier' ||
      operation === 'validateIdentifierByCode'
    ) {
      return true;
    }
    return false;
  }
}
