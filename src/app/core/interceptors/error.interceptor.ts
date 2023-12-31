import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, Injector, PLATFORM_ID } from '@angular/core';
import { Observable, throwError, tap } from 'rxjs';
import { environment } from '@env/environment';
import { NotificationService } from '@app/core/services/notification.service';
import { Router } from '@angular/router';

/**
 * The error interceptor examines all HTTP requests & responses and dislays any error notifications.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.apiUrl)) {
      return next.handle(req).pipe(
        tap({
          next: (event) => {
            if (event instanceof HttpResponse) {
              this.notifyOnError(event);
            }
          },
          error: (err) => {
            if (err instanceof HttpErrorResponse) {
              this.notifyOnError(err);
            } else {
              this.displayErrorNotification(err.message);
            }
          },
        })
      );
    }
    return next.handle(req);
  }

  private notifyOnError(response: HttpResponse<any> | HttpErrorResponse) {
    if (response instanceof HttpErrorResponse) {
      if (response.status === 0) {
        this.displayErrorNotification('Could not connect to server!');
      } else {
        this.displayErrorNotification(response.toString());
      }
    } else {
      // GraphQL errors still return 200 OK responses, but have the actual error message
      // inside the body of the response.
      const graqhQLErrors = response.body.errors;
      if (graqhQLErrors && Array.isArray(graqhQLErrors)) {
        const firstCode: string = graqhQLErrors[0].extensions.code;
        // const firstCode: string = graqhQLErrors[0].code;
        if (firstCode === 'UNAUTHENTICATED') {
          throwError(() => 'UNAUTHENTICATED');
        } else if (firstCode === 'INTERNAL_SERVER_ERROR') {
          // redirect to 'Server Error' page
          this.router.navigate(['/error/server-error']);
          // auto logout needed?
        } else if (firstCode === 'CHANNEL_NOT_FOUND') {
          const message = graqhQLErrors.map((err) => err.message).join('\n');
          this.displayErrorNotification(message);
        } else {
          const message = graqhQLErrors.map((err) => err.message).join('\n');
          this.displayErrorNotification(message);
        }
      }
    }
  }

  /**
   * We need to lazily inject the NotificationService since it depends on the I18nService which
   * eventually depends on the HttpClient (used to load messages from json files). If we were to
   * directly inject NotificationService into the constructor, we get a cyclic dependency.
   */
  private displayErrorNotification(message: string): void {
    const notificationService =
      this.injector.get<NotificationService>(NotificationService);
    notificationService.error(message).subscribe();
  }

  /**
   * If the server is configured to use the "bearer" tokenMethod, each response should be checked
   * for the existence of an auth token.
   */
  // private checkForAuthToken(response: HttpResponse<any>) {
  //   if (
  //     environment.tokenMethod === 'bearer' &&
  //     isPlatformBrowser(this.platformId)
  //   ) {
  //     const authToken = response.headers.get('vendure-auth-token');
  //     if (authToken) {
  //       localStorage.setItem('authToken', authToken);
  //     }
  //   }
  // }
}
