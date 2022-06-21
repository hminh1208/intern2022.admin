import { TestBed } from '@angular/core/testing';

import { BasicApiService } from './basic-api.service';

describe('BasicApiService', () => {
  let service: BasicApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
