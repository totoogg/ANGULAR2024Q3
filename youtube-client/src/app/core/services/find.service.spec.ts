import { TestBed } from '@angular/core/testing';
import { lastValueFrom } from 'rxjs';
import { FindService } from './find.service';
import { IFind } from '../../shared/models/IFind';

describe('FindService', () => {
  let service: FindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('changeOption()', (done) => {
    const data: IFind = {
      start: false,
      value: 'abc',
    };

    service.changeOption(data);

    expect(service.value).toBe('abc');
    expect(service.start).toBe(false);
    expect(lastValueFrom(service.startPush$)).resolves.toEqual(false);
    expect(lastValueFrom(service.valuePush$)).resolves.toEqual('abc');
    done();
  });
});
