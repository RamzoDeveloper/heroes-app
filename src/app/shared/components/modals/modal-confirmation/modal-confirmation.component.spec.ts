import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalConfirmationComponent } from './modal-confirmation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalConfirmationComponent', () => {
  let component: ModalConfirmationComponent;
  let fixture: ComponentFixture<ModalConfirmationComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ModalConfirmationComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ModalConfirmationComponent, SharedModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { message: 'Are you sure?' } }, // Mocked data
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with false when onNoClick() is called', () => {
    component.onNoClick();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should close the dialog with true when onSubmit() is called', () => {
    component.onSubmit();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });
});
