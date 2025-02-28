import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  showLoading(message: string = 'Cargando...') {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  hideLoading() {
    Swal.close();
  }

  success(title: string = 'Operación existosa') {
    Swal.fire({
      icon: 'success',
      title,
    });
  }
}
