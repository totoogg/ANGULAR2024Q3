import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { SearchItemComponent } from './search-item.component';
import { appReducer } from '../../../redux/reducers/app.reducer';
import { SliceTitlePipe } from '../../../youtube/pipes/slice-title.pipe';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { ColorLineDirective } from '../../../youtube/directives/color-line.directive';

describe('SearchItemComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchItemComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [
        StoreModule.forRoot({ app: appReducer, router: routerReducer }),
        SliceTitlePipe,
        CustomButtonComponent,
        ColorLineDirective,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
