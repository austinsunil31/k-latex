import { TestBed } from '@angular/core/testing';

import { ToastServiceTsService } from './toast.service.ts.service';

describe('ToastServiceTsService', () => {
  let service: ToastServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
