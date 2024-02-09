import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './espace-public/login/login.component';
import { SignupComponent } from './espace-public/signup/signup.component';
import { EspacePublicComponent } from './espace-public/espace/espace-public.component';
import { SharedModule } from './espace-public/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
    declarations: [
        LoginComponent,SignupComponent,EspacePublicComponent
    ],
    imports: [
        CommonModule,
        PublicRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule
    
   
    ],
    exports: [EspacePublicComponent],

})
export class PublicModule { }
