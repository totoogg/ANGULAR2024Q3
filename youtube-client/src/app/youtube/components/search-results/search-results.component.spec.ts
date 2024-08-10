import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { SearchResultsComponent } from './search-results.component';
import { appReducer } from '../../../redux/reducers/app.reducer';
import { SortVideosPipe } from '../../pipes/sort-videos.pipe';
import { FilterVideosPipe } from '../../pipes/filter-videos.pipe';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [
        StoreModule.forRoot({ app: appReducer, router: routerReducer }),
        FilterVideosPipe,
        SortVideosPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
