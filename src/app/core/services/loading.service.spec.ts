import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';
import Swal from 'sweetalert2';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
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
