import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';
import { DevLoggerService } from '../../services/dev-logger.service';
import { appReducer } from '../../../redux/reducers/app.reducer';
import { CustomButtonComponent } from '../../../shared/components/custom-button/custom-button.component';
import { SliceTitlePipe } from '../../../youtube/pipes/slice-title.pipe';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: 'Logger', useClass: DevLoggerService },
        provideHttpClient(), provideHttpClientTesting(),
      ],
      imports: [StoreModule.forRoot({ app: appReducer, router: routerReducer }), SliceTitlePipe,
        CustomButtonComponent, NzIconModule.forRoot(icons), ReactiveFormsModule,
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
});
