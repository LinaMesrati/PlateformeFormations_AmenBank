// admin.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from "./shared/shared.module";
import { CartsModule } from './carts/carts.module';
import { FormationDetailsComponent } from './formations/components/formation-details/formation-details.component';
import { AllFormationsComponent } from './formations/components/all-formations/all-formations.component';
import { FormationModule } from './formations/formation.module';
import { FormationComponent } from './formations/components/formation/formation.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { GestFormateurComponent } from './formateur/gest-formateur/gest-formateur.component';
import { RepDemandeComponent } from './rep-demande/rep-demande.component';
import { NgxPaginationModule, PaginationService } from 'ngx-pagination';

@NgModule({
  declarations: [
    AllFormationsComponent,
    FormationDetailsComponent,
    FormationComponent,
    GestFormateurComponent,
    RepDemandeComponent
  ],
  imports: [
    SharedModule,
    CartsModule,
    FormationModule,
    AdminRoutingModule,
    CommonModule,
    NgxPaginationModule
   
  ],
  providers: [PaginationService],
})
export class AdminModule { }
