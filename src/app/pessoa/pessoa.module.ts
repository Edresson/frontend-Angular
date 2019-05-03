import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'list', component: PessoaListComponent }
];

@NgModule({
  declarations: [PessoaListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PessoaModule { }
