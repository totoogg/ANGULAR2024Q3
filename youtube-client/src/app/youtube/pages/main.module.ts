import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SearchResultsComponent } from '../components/search-results/search-results.component';
import { DetailComponent } from '../components/detail/detail.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ColorLineDirective } from '../directives/color-line.directive';
import { FormatDateCustomPipe } from '../pipes/format-date-custom.pipe';

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
  ],
})
export class PagesModule {}
