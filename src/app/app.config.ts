import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; // Nueva función para configurar el in-memory API
import { InMemoryDataService } from './core/services/in-memory-data.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { provideHttpClientTesting } from '@angular/common/http/testing';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([LoadingInterceptor])),
    provideHttpClientTesting(),
    importProvidersFrom([
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        dataEncapsulation: false,
      }),
    ]),
  ],
};
