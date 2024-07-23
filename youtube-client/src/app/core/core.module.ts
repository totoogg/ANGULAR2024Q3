import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { SliceTitlePipe } from '../youtube/pipes/slice-title.pipe';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', title: 'AdminPage', component: AdminComponent },
];

@NgModule({
  declarations: [NotFoundComponent, AdminComponent, HeaderComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
    SliceTitlePipe,
    FormsModule,
  ],
  exports: [NotFoundComponent, HeaderComponent],
})
export class CoreModule {}
