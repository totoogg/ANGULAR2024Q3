import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { VideosService } from './videos.service';

describe('VideosService', () => {
  let service: VideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(VideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
