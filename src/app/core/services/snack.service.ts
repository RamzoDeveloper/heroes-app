import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar) {}

  success(): void {
    this.snackBar.open('Operación Exitosa!', '✔️', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
}
