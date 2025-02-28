import { TestBed } from '@angular/core/testing';
import Swal from 'sweetalert2';
import { SwalService } from './swal.service';

describe('LoadingService', () => {
  let service: SwalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should close the loading alert', () => {
    const swalSpy = spyOn(Swal, 'close');
    service.hideLoading();
    expect(swalSpy).toHaveBeenCalled();
  });
});
