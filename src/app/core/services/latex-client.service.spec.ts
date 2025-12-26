import { TestBed } from '@angular/core/testing';

import { LatexClientService } from './latex-client.service';

describe('LatexClientService', () => {
  let service: LatexClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LatexClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
