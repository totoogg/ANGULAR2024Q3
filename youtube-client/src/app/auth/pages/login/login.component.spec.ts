import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { DevLoggerService } from '../../../core/services/dev-logger.service';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, LoginFormComponent],
      providers: [{ provide: 'Logger', useClass: DevLoggerService }],
      imports: [ReactiveFormsModule, CustomButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
