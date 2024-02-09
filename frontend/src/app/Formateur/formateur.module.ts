
import { NgModule } from '@angular/core';
import { SharedModule } from "./shared/shared.module";
import { FormationDetailsComponent } from './formations/components/formation-details/formation-details.component';
import { AllFormationsComponent } from './formations/components/all-formations/all-formations.component';
import { FormationModule } from './formations/formation.module';
import { FormationComponent } from './formations/components/formation/formation.component';
import { CommonModule } from '@angular/common';
import { FormateurRoutingModule } from './formateur-routing.module';
import { MesSessionsComponent } from './mes-sessions/mes-sessions.component';
import { DemandeComponent } from './demande/demande.component';
import { RepDemandeComponent } from './rep-demande/rep-demande.component';

@NgModule({
  declarations: [
    AllFormationsComponent,
    FormationDetailsComponent,
    FormationComponent,
    MesSessionsComponent,
    DemandeComponent,
    RepDemandeComponent
  ],
  imports: [
    SharedModule,
    FormationModule,
    FormateurRoutingModule,
    CommonModule,

   
  ]
})
export class FormateurModule { }
