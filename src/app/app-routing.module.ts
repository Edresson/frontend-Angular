import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DefaultComponent } from './default/default.component';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'pessoa', loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule), canActivate: [AuthGuard] },
  { path: 'area', loadChildren: () => import('./area/area.module').then(m => m.AreaModule), canActivate: [AuthGuard] },
  { path: 'contrato', loadChildren: () => import('./contrato/contrato.module').then(m => m.ContratoModule), canActivate: [AuthGuard] },
  { path: 'resource', loadChildren: () => import('./resource/resource.module').then(m => m.ResourceModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
