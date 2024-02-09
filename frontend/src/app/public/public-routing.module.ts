import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspacePublicComponent } from './espace-public/espace/espace-public.component';
import { LoginComponent } from './espace-public/login/login.component';
import { SignupComponent } from './espace-public/signup/signup.component';



const routes: Routes = [
  {path:"",component:EspacePublicComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
