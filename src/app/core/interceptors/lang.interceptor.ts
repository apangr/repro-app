import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LangInterceptor implements HttpInterceptor {
  constructor(private translateService: TranslateService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const lang = this.translateService.currentLang.split('-');
    const modifiedReq = request.clone({
      headers: request.headers.set('accept-language', lang[0]),
    });
    return next.handle(modifiedReq);
  }
}
