import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioService } from '../@services/usuario.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private userService: UsuarioService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.userService.isLoggedIn()) {
      request = this.addCredentials(request);
      return next.handle(request)
        .pipe(
          catchError(error => {
            return this.handleError(error, request, next)
          })
        );
    }
    return next.handle(request);
  }
  private addCredentials = (request: HttpRequest<any>) => {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userService.getToken()}`
      }
    });

  };
  private handleError(error: any, request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 403) { //log back in!!
        let strReturn: string = '/inicio';
        this.userService.logout();
        return throwError(error);
      }
      else {
        return throwError(error);
      }
    } else {
      return throwError(error);
    }
  }
}
