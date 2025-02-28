import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SwalService } from '../services/swal.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private swalService: SwalService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.swalService.showLoading();
    return next.handle(request).pipe(
      finalize(() => {
        this.swalService.hideLoading();
      })
    );
  }
}
