import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { SliceTitlePipe } from '../youtube/pipes/slice-title.pipe';
import { CustomButtonComponent } from '../shared/components/custom-button/custom-button.component';

const routes: Routes = [
  { path: '', title: 'AdminPage', component: AdminComponent },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    SliceTitlePipe,
    FormsModule,
    CustomButtonComponent,
  ],
})
export class AdminModule {}
