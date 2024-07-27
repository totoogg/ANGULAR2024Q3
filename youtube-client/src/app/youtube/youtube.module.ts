import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MainComponent } from './pages/main/main.component';
import { DetailComponent } from './components/detail/detail.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ColorLineDirective } from './directives/color-line.directive';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { FilterVideosPipe } from './pipes/filter-videos.pipe';
import { SortVideosPipe } from './pipes/sort-videos.pipe';
import { SliceTitlePipe } from './pipes/slice-title.pipe';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';
import { PaginatorService } from '../core/services/paginator.service';

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
    CommonModule,
    FilterVideosPipe,
    SortVideosPipe,
    SliceTitlePipe,
    CustomButtonComponent,
    MatPaginatorModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorService }],
})
export class YoutubeModule {}
