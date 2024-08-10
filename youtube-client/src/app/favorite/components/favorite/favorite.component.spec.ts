import { ComponentFixture, TestBed } from '@angular/core/testing';
import { routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { FavoriteComponent } from './favorite.component';
import { appReducer } from '../../../redux/reducers/app.reducer';

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteComponent],
      imports: [StoreModule.forRoot({ app: appReducer, router: routerReducer })],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.main__start')?.textContent).toContain('No favorite videos');
  });
});
