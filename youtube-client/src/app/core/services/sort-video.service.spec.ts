import { TestBed } from '@angular/core/testing';

import { lastValueFrom } from 'rxjs';
import { SortVideoService } from './sort-video.service';
import { ISort } from '../../shared/models/ISort';

describe('SortVideoService', () => {
  let service: SortVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('changeSortOption()', (done) => {
    const data: ISort = {
      activeSortDate: true,
      ascDate: true,
      descDate: false,
      activeSortView: true,
      ascView: true,
      descView: false,
    };

    service.changeSortOption(data);

    expect(service.sort).toStrictEqual(data);
    expect(lastValueFrom(service.sortPush$)).resolves.toEqual(data);
    done();
  });
});
