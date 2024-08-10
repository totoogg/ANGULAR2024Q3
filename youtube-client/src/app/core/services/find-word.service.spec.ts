import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
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

  it('changeWord()', (done) => {
    service.changeWord('abc');

    expect(lastValueFrom(service.word$)).resolves.toEqual('abc');
    done();
  });
});
