import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { AdminComponent } from './admin.component';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule, MockComponent(CustomButtonComponent)],
      declarations: [AdminComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.form__title')?.textContent).toContain('Create new card');
  });

  it('should submit button button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.button__submit')?.textContent).toContain('Create card');
  });

  it('checkLengthTags()', () => {
    expect(component.checkLengthTags()).toBe(false);
  });
});
