import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared.module';

@Component({
  selector: 'app-modal-confirmation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './modal-confirmation.component.html',
  styleUrl: './modal-confirmation.component.scss',
})
export class ModalConfirmationComponent {
  readonly dialogRef = inject(MatDialogRef<any>);

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    this.dialogRef.close(true);
  }
}
