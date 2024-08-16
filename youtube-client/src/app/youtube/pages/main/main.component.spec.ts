import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { MockProvider } from 'ng-mocks';
import { Store, StoreModule } from '@ngrx/store';
import { MainComponent } from './main.component';
import { CoreModule } from '../../../core/core.module';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { FilterVideosPipe } from '../../pipes/filter-videos.pipe';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent, SearchResultsComponent],
      imports: [
        CoreModule,
        EffectsModule.forRoot([]),
        FilterVideosPipe,
        StoreModule.forRoot({}),
      ],
      providers: [provideHttpClient(), provideHttpClientTesting(), MockProvider(Store)],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
