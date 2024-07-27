import { isDevMode, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DevLoggerService } from './core/services/dev-logger.service';
import { ProdLoggerService } from './core/services/prod-logger.service';
import { apiInterceptor } from './core/interceptor/api.interceptor';
import { CoreModule } from './core/core.module';
import { appReducer } from './redux/reducers/app.reducer';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(en);

function myFactory() {
  return isDevMode() ? new DevLoggerService() : new ProdLoggerService();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot({ app: appReducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    FormsModule,
  ],
  providers: [
    { provide: 'Logger', useFactory: myFactory },
    provideHttpClient(withInterceptors([apiInterceptor])),
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
