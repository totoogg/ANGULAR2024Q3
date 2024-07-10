import { TestBed } from '@angular/core/testing';

import { SortVideoService } from './sort-video.service';

describe('SortVideoService', () => {
  let service: SortVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
