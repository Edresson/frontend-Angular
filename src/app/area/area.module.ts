import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaFormComponent } from './area-form/area-form.component';
import { AreaListComponent } from './area-list/area-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterAreaServiceService } from './area-form/register-area-service.service';

const routes: Routes = [
  { path: 'new', component: AreaFormComponent },
  { path: 'all', component: AreaListComponent}
];

@NgModule({
  declarations: [AreaFormComponent, AreaListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    RegisterAreaServiceService, // seu provider aqui
  ]
})
export class AreaModule { }
