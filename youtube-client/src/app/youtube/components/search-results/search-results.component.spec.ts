import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SearchResultsComponent } from './search-results.component';
import { SortVideosPipe } from '../../pipes/sort-videos.pipe';
import { FilterVideosPipe } from '../../pipes/filter-videos.pipe';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideMockStore({ })],
      imports: [
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

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.main__start')?.textContent).toContain('Enter a search term of at least 3 characters');
  });
});
