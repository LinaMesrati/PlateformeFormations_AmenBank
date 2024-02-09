import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SharedModule } from "./shared/shared.module";
import { CartsModule } from './carts/carts.module';
import { FormationDetailsComponent } from './formations/components/formation-details/formation-details.component';
import { AllFormationsComponent } from './formations/components/all-formations/all-formations.component';
import { FormationModule } from './formations/formation.module';
import { FormationComponent } from './formations/components/formation/formation.component';
import { CandidatRoutingModule } from './candidat-routing.module';
import { MesSessionsComponent } from './mes-sessions/mes-sessions.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
    declarations: [
  
        AllFormationsComponent,
        FormationDetailsComponent,
        FormationComponent,
        MesSessionsComponent
    ],

    imports: [
        CommonModule,
        SharedModule,
        CartsModule,
        FormationModule,
        CandidatRoutingModule,
        NgxPaginationModule
        
     
    ],
    exports: [AllFormationsComponent, FormationModule,FormationDetailsComponent,
        FormationComponent,]
})
export class CandidatModule { }
