import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaFormComponent } from './area-form/area-form.component';
import { AreaListComponent } from './area-list/area-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { RegisterAreaServiceService } from './area-form/register-area-service.service';

import { AgmCoreModule } from '@agm/core';
import { AreaService } from './area.service';

const routes: Routes = [
  { path: 'new', component: AreaFormComponent },
  { path: 'all', component: AreaListComponent},
  { path: 'edit/:id', component: AreaFormComponent}
];

@NgModule({
  declarations: [AreaFormComponent, AreaListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3GsNDa6YcGMgcTw0e4tpSq5mSbC2Qz2s',
      libraries: ['drawing']
    })
  ],
  providers: [
    AreaService, 
  ]
})
export class AreaModule { }
