import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { appReducer } from '../../../redux/reducers/app.reducer';
import { favoriteReducer } from '../../../core/store/reducers/core.reducer';
import { ColorLineDirective } from '../../directives/color-line.directive';
import { DetailComponent } from './detail.component';

@Component({
  template: '<router-outlet></router-outlet>',
})
class TestRootComponent {}

describe('DetailPageComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let router: Router;
  let rootFixture: ComponentFixture<TestRootComponent>;

  function navigateByHeroId(id: string) {
    rootFixture?.ngZone?.run(() => router.navigate(['detail', id]));
  }

  function advance() {
    rootFixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent, TestRootComponent],
      imports: [
        StoreModule.forRoot({ app: appReducer, router: routerReducer }),
        RouterModule.forRoot([
          { path: 'main/:id', component: DetailComponent },
        ]),
        StoreModule.forFeature('favorite', favoriteReducer),
        ColorLineDirective,
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootFixture = TestBed.createComponent(TestRootComponent);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    navigateByHeroId('nq4aU9gmZQk');
    advance();
    expect(component).toBeTruthy();
  });
});
