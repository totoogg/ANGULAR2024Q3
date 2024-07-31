import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
} from '@ant-design/icons-angular/icons';
import { EffectsModule } from '@ngrx/effects';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { SliceTitlePipe } from '../youtube/pipes/slice-title.pipe';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';
import { favoriteReducer } from './store/reducers/core.reducer';
import { CoreEffects } from './store/effects/core.effects';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { ColorLineDirective } from '../youtube/directives/color-line.directive';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

@NgModule({
  declarations: [NotFoundComponent, HeaderComponent, SearchItemComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SliceTitlePipe,
    FormsModule,
    CustomButtonComponent,
    StoreModule.forFeature('favorite', favoriteReducer),
    NzIconModule.forRoot(icons),
    EffectsModule.forFeature([CoreEffects]),
    ColorLineDirective,
  ],
  exports: [NotFoundComponent, HeaderComponent, SearchItemComponent],
})
export class CoreModule {}
