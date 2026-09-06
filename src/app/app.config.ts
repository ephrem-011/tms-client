import {
  ApplicationConfig,
  provideZonelessChangeDetection
} from '@angular/core';

import {
  provideRouter,
  withComponentInputBinding
} from '@angular/router';

import {
  withXsrfConfiguration
} from '@angular/common/http';

import { routes } from './app.routes';

import { credentialsInterceptor } from './Interceptors/credentials.interceptor';
import { errorInterceptor } from './Interceptors/error.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './Interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),

    provideRouter(
      routes,
      withComponentInputBinding()
    ),

    provideHttpClient(
      withInterceptors([
        credentialsInterceptor, errorInterceptor, jwtInterceptor  
      ]),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    )
  ]
};