import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { DetailComponent } from './components/detail/detail.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ColorLineDirective } from './directives/color-line.directive';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormatDateCustomPipe } from './pipes/format-date-custom.pipe';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';

const routes: Routes = [
  { path: '', title: 'MainPage', component: MainComponent },
  { path: ':id', title: 'DetailPage', component: DetailPageComponent },
];

@NgModule({
  declarations: [MainComponent, DetailPageComponent, DetailComponent],
  imports: [
    RouterModule.forChild(routes),
    SearchResultsComponent,
    ColorLineDirective,
    FormatDateCustomPipe,
    CommonModule,
    CustomButtonComponent,
  ],
})
export class PagesModule {}
