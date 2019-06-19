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
  { path: 'pessoa', loadChildren: './pessoa/pessoa.module#PessoaModule', canActivate: [AuthGuard] },
  { path: 'area', loadChildren: './area/area.module#AreaModule', canActivate: [AuthGuard] },
  { path: 'contrato', loadChildren: './contrato/contrato.module#ContratoModule', canActivate: [AuthGuard] },
  { path: 'resource', loadChildren: './resource/resource.module#ResourceModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
