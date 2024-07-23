import { isDevMode, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DevLoggerService } from './core/services/dev-logger.service';
import { ProdLoggerService } from './core/services/prod-logger.service';
import { apiInterceptor } from './core/interceptor/api.interceptor';
import { CoreModule } from './core/core.module';

function myFactory() {
  return isDevMode() ? new DevLoggerService() : new ProdLoggerService();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [
    { provide: 'Logger', useFactory: myFactory },
    provideHttpClient(withInterceptors([apiInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
