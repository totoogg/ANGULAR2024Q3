import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SliceTitlePipe } from '../youtube/pipes/slice-title.pipe';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { CoreModule } from '../core/core.module';

const routes: Routes = [
  { path: '', title: 'FavoritePage', component: FavoriteComponent },
];

@NgModule({
  declarations: [FavoriteComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SliceTitlePipe,
    CustomButtonComponent,
    CoreModule,
  ],
})
export class FavoriteModule {}
