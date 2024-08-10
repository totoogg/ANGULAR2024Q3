import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { DevLoggerService } from '../../../core/services/dev-logger.service';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      providers: [{ provide: 'Logger', useClass: DevLoggerService }],
      imports: [ReactiveFormsModule, CustomButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.form__title')?.textContent).toContain('Login');
  });

  it('should render the button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.form__button')?.textContent).toContain('Login');
  });

  it('errorsMessage()', () => {
    const result = [
      {
        errorValid: 'required',
        message: 'Please enter a password',
      },
      {
        errorValid: 'passwordUpperLowValidator',
        message: "Your password isn't strong enough a mixture of both uppercase and lowercase letters",
      },
      {
        errorValid: 'passwordLetterNumberValidator',
        message: "Your password isn't strong enough a mixture of letters and numbers",
      },
      {
        errorValid: 'passwordSpecialValidator',
        message: "Your password isn't strong enough inclusion of at least one special character, e.g., ! &#64; # ? ]",
      },
    ];
    expect(component.errorsMessage()).toStrictEqual(result);
  });
});
