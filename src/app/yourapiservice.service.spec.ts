import { TestBed } from '@angular/core/testing';

import { YourapiserviceService } from './yourapiservice.service';

describe('YourapiserviceService', () => {
  let service: YourapiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourapiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
