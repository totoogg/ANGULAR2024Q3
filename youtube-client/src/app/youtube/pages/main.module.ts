import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DetailComponent } from './detail/detail.component';
import { SearchResultsComponent } from '../components/search-results/search-results.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: ':id', component: DetailComponent },
];

@NgModule({
  declarations: [MainComponent, DetailComponent],
  imports: [RouterModule.forChild(routes), SearchResultsComponent],
})
export class PagesModule {}
