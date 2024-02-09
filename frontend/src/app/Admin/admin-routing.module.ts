import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspacePublicComponent } from '../public/espace-public/espace/espace-public.component';
import { SignupComponent } from './signup/signup.component';
import { GestFormateurComponent } from './formateur/gest-formateur/gest-formateur.component';



const routes: Routes = [
  {path:"logout",component:EspacePublicComponent},
  {path:"",component:GestFormateurComponent},
  {path:"ajouter",component:SignupComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RespRoutingModule { }
