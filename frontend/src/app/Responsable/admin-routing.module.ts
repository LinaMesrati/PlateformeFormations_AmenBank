import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';
import { AllFormationsComponent } from './formations/components/all-formations/all-formations.component';
import { FormationDetailsComponent } from './formations/components/formation-details/formation-details.component';
import { EspacePublicComponent } from '../public/espace-public/espace/espace-public.component';
import { GestFormateurComponent } from './formateur/gest-formateur/gest-formateur.component';
import { RepDemandeComponent } from './rep-demande/rep-demande.component';

const routes: Routes = [
  {path:"formations",component:AllFormationsComponent},
  {path:"gestForm",component:GestFormateurComponent},
  {path:"details/:id",component:FormationDetailsComponent},
  {path:"logout",component:EspacePublicComponent},
  {path:"demandes",component:RepDemandeComponent},
  {path:"",component:CartComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
