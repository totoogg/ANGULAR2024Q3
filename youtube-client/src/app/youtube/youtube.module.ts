import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { DetailComponent } from './components/detail/detail.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ColorLineDirective } from './directives/color-line.directive';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormatDateCustomPipe } from './pipes/format-date-custom.pipe';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { FilterVideosPipe } from './pipes/filter-videos.pipe';
import { SortVideosPipe } from './pipes/sort-videos.pipe';
import { SliceTitlePipe } from './pipes/slice-title.pipe';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', title: 'MainPage', component: MainComponent },
  { path: ':id', title: 'DetailPage', component: DetailPageComponent },
];

@NgModule({
  declarations: [
    MainComponent,
    DetailPageComponent,
    DetailComponent,
    SearchResultsComponent,
    SearchItemComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    ColorLineDirective,
    FormatDateCustomPipe,
    CommonModule,
    SharedModule,
    FilterVideosPipe,
    SortVideosPipe,
    SliceTitlePipe,
  ],
})
export class YoutubeModule {}
