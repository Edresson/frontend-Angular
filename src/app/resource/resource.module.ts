import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ResourceService } from './resource.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';



const routes: Routes = [
  { path: 'all', component: ResourceListComponent},
  { path: 'id/:id', component: ResourceListComponent}
];

@NgModule({
  declarations: [ResourceListComponent],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC3GsNDa6YcGMgcTw0e4tpSq5mSbC2Qz2s'
    })
  ],
  providers: [
    ResourceService, 
  ]
})

export class ResourceModule { }
