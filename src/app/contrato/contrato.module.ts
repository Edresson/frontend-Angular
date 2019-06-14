import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContratoListComponent } from './contrato-list/contrato-list.component';
import { ContratoFormComponent } from './contrato-form/contrato-form.component';
import { Routes, RouterModule } from '@angular/router';
import { ContratoService } from './contrato.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';



const routes: Routes = [
  { path: 'new', component: ContratoFormComponent },
  { path: 'all', component: ContratoListComponent},
  { path: 'edit/:id', component: ContratoFormComponent}
];

@NgModule({
  declarations: [ContratoFormComponent, ContratoListComponent],
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
    ContratoService, 
  ]
})

export class ContratoModule { }
