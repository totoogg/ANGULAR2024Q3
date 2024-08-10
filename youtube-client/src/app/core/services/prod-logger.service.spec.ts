import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ProdLoggerService } from './prod-logger.service';

describe('ProdLoggerService', () => {
  let service: ProdLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [ProdLoggerService],
    });
    service = TestBed.inject(ProdLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
