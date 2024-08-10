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
});
