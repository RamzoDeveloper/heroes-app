import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  showLoading(
    message: string = 'Cargando...',
    successMessage: string = 'Operación exitosa'
  ) {
    let timerInterval: any;

    Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {}, 100);
      },
      timer: 1000,
      timerProgressBar: true,
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then(() => {
      this.success(successMessage);
    });
  }

  hideLoading() {
    Swal.close();
  }

  success(title: string = 'Operación exitosa') {
    Swal.fire({
      icon: 'success',
      title,
      timer: 1000,
      showConfirmButton: false,
    });
  }
}
