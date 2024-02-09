import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';
import { AllFormationsComponent } from './formations/components/all-formations/all-formations.component';
import { FormationDetailsComponent } from './formations/components/formation-details/formation-details.component';
import { LoginComponent } from '../public/espace-public/login/login.component';
import { MesSessionsComponent } from './mes-sessions/mes-sessions.component';

const routes: Routes = [
  {path:"",component:AllFormationsComponent},
  {path:"details/:id",component:FormationDetailsComponent},
  {path:"cart",component:CartComponent},
  {path:"login",component:LoginComponent},
  {path:"session",component:MesSessionsComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatRoutingModule { }
