import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';
import { HeaderComponent } from './header.component';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { SliceTitlePipe } from '../../../youtube/pipes/slice-title.pipe';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: 'Logger', useValue: {} },
        provideHttpClient(), provideHttpClientTesting(),
        provideMockStore({}),
      ],
      imports: [SliceTitlePipe,
        MockComponent(CustomButtonComponent), NzIconModule.forRoot(icons),
        SliceTitlePipe,
        FormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as value \'demo-angular-jest\'', () => {
    component.value = 'demo-angular-jest';
    expect(component.value).toEqual('demo-angular-jest');
  });

  it('should render the value', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const el = compiled.querySelector('input[name="search"]') as HTMLInputElement;
    el.value = 'demo-angular-jest';
    expect(el?.value).toContain('demo-angular-jest');
  });

  it('should have as showSort \'demo-angular-jest\'', () => {
    expect(component.showSort).toEqual(false);
  });

  it('should have as extraValue \'demo-angular-jest\'', () => {
    component.extraValue = 'demo-angular-jest';
    expect(component.extraValue).toEqual('demo-angular-jest');
  });
});
