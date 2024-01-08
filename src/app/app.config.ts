import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { AuthGuardService } from './service/Auth-guard.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),AuthGuardService,HttpClientModule,HttpClient]
};
