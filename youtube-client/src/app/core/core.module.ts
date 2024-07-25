import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { SliceTitlePipe } from '../youtube/pipes/slice-title.pipe';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';

@NgModule({
  declarations: [NotFoundComponent, HeaderComponent],
  imports: [ReactiveFormsModule, CommonModule, SliceTitlePipe, FormsModule, CustomButtonComponent],
  exports: [NotFoundComponent, HeaderComponent],
})
export class CoreModule {}
