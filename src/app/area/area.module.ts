import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAreaComponent } from './new-area/new-area.component';
import { EditAreaComponent } from './edit-area/edit-area.component';
import { AreasComponent } from './areas/areas.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterAreaServiceService } from './new-area/register-area-service.service';

const routes: Routes = [
  { path: 'new', component: NewAreaComponent }
];

@NgModule({
  declarations: [NewAreaComponent, EditAreaComponent, AreasComponent],
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
