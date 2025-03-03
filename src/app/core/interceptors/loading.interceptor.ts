import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';

export function LoadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  Swal.fire({
    title: 'Cargando...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  return next(req).pipe(
    tap((event) => {
      Swal.close();
    })
  );
}
