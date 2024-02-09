import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspacePublicComponent } from '../public/espace-public/espace/espace-public.component';
import { MesSessionsComponent } from './mes-sessions/mes-sessions.component';
import { DemandeComponent } from './demande/demande.component';
import { RepDemandeComponent } from './rep-demande/rep-demande.component';

const routes: Routes = [
  {path:"demande",component:DemandeComponent},
  {path:"mesdemandes",component:RepDemandeComponent},
  {path:"logout",component:EspacePublicComponent},
  {path:"",component:MesSessionsComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormateurRoutingModule { }
