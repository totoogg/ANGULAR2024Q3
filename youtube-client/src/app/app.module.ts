import { isDevMode, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { SearchResultsComponent } from './youtube/components/search-results/search-results.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { DevLoggerService } from './core/services/dev-logger.service';
import { ProdLoggerService } from './core/services/prod-logger.service';

function myFactory() {
  return isDevMode() ? new DevLoggerService() : new ProdLoggerService();
}

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    SearchResultsComponent,
    AppRoutingModule,
  ],
  providers: [{ provide: 'Logger', useFactory: myFactory }],
  bootstrap: [AppComponent],
})
export class AppModule {}
