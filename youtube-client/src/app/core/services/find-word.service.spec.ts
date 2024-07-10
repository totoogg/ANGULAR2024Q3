import { TestBed } from '@angular/core/testing';

import { FindWordService } from './find-word.service';

describe('FindWordService', () => {
  let service: FindWordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindWordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
