import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { routerReducer } from '@ngrx/router-store';
import { MainComponent } from './main.component';
import { CoreModule } from '../../../core/core.module';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';
import { FilterVideosPipe } from '../../pipes/filter-videos.pipe';
import { appReducer } from '../../../redux/reducers/app.reducer';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent, SearchResultsComponent],
      imports: [
        CoreModule,
        StoreModule.forRoot({ app: appReducer, router: routerReducer }),
        EffectsModule.forRoot([]),
        FilterVideosPipe,
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
