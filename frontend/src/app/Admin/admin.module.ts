
import { NgModule } from '@angular/core';
import { SharedModule } from "./shared/shared.module";
import { CommonModule } from '@angular/common';

import { RespRoutingModule } from './admin-routing.module';
import { SignupComponent } from './signup/signup.component';
import { GestFormateurComponent } from './formateur/gest-formateur/gest-formateur.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
   SignupComponent,GestFormateurComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RespRoutingModule,
    NgxPaginationModule
   
  ]
})
export class RespModule { }
