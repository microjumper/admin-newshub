import { TestBed } from '@angular/core/testing';

import { NewshubService } from './newshub.service';

describe('NewshubService', () => {
  let service: NewshubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewshubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
