
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtHelperService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const expiry = this.jwtService.isTokenExpired();
    const token = expiry ? localStorage.getItem('refresh') : this.jwtService.tokenGetter();

    const headersConfig = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const authReq = req.clone({
      setHeaders: headersConfig
    });

    return next.handle(authReq);
  }
}