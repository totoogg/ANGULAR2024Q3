import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { LoginFormComponent } from './login-form.component';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      providers: [{ provide: 'Logger', useValue: {} }],
      imports: [ReactiveFormsModule, MockComponent(CustomButtonComponent)],
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

  it('should check login error', () => {
    const hostElement = fixture.nativeElement;
    const nameInput = hostElement.querySelector('#login');
    const nameDisplay = hostElement.querySelector('.form__login > .start');
    const newInputVal = 'quick BROWN fOx';
    nameInput.value = newInputVal;
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const error = hostElement.querySelector('.form__login > .alert');

    expect(nameDisplay.textContent).toBe('Please enter a login email');
    expect(error.textContent).toBe('The login email is invalid');
    expect(hostElement.querySelector('.form__button').disabled).toBeFalsy();
  });

  it('should check login right', () => {
    const hostElement = fixture.nativeElement;
    const nameInput = hostElement.querySelector('#login');
    const nameDisplay = hostElement.querySelector('.form__login > .start');
    const newInputVal = 'asd@asd.asd';
    nameInput.value = newInputVal;
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const error = hostElement.querySelector('.form__login > .alert');

    expect(nameDisplay.textContent).toBe('Please enter a login email');
    expect(error).toBe(null);
    expect(hostElement.querySelector('.form__button').disabled).toBeFalsy();
  });

  it('should check password error', () => {
    const hostElement = fixture.nativeElement;
    const nameInput = hostElement.querySelector('#password');
    const nameDisplay = hostElement.querySelector('.form__password > .start');
    const newInputVal = 'asd@asd.asd';
    nameInput.value = newInputVal;
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const error = hostElement.querySelectorAll('.form__password > .alert');

    expect(nameDisplay.textContent).toBe('Please enter a password');
    expect(error.length).toBe(2);
    expect(hostElement.querySelector('.form__button').disabled).toBeFalsy();
  });

  it('should check password right', () => {
    const hostElement = fixture.nativeElement;
    const nameInput = hostElement.querySelector('#password');
    const nameDisplay = hostElement.querySelector('.form__password > .start');
    const newInputVal = 'Aa@2asdasdasd';
    nameInput.value = newInputVal;
    nameInput.dispatchEvent(new Event('input'));
    nameInput.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    const error = hostElement.querySelectorAll('.form__password > .alert');

    expect(nameDisplay.textContent).toBe('Please enter a password');
    expect(error.length).toBe(0);
    expect(hostElement.querySelector('.form__button').disabled).toBeFalsy();
  });

  it('should check correct form', () => {
    const hostElement = fixture.nativeElement;
    const nameInputLogin = hostElement.querySelector('#login');
    const nameInputPassword = hostElement.querySelector('#password');
    const newInputValLogin = 'asd@asd.asd';
    const newInputValPassword = 'Aa@2asdasdasd';
    nameInputLogin.value = newInputValLogin;
    nameInputPassword.value = newInputValPassword;
    nameInputLogin.dispatchEvent(new Event('input'));
    nameInputLogin.dispatchEvent(new Event('blur'));
    nameInputPassword.dispatchEvent(new Event('input'));
    nameInputPassword.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(hostElement.querySelector('.form__button').disabled).toBeUndefined();
  });
});
