import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardUserGuard } from './public/guards/authguard-user.guard';
import { AuthguardAdminGuard } from './public/guards/authguard-admin.guard';
import { AuthguardFormateurGuard } from './public/guards/authguard-formateur.guard';
import { AuthguardRespGuard } from './public/guards/authguard-resp.guard';



const routes: Routes = [
  
  {
    path: 'admin',
    loadChildren: () => import('./Responsable/admin.module')
      .then(m => m.AdminModule),canActivate: [AuthguardAdminGuard],
  },
  {
    path: 'candidat',
    loadChildren: () => import('./Candidat/candidat.module')
      .then(m => m.CandidatModule), canActivate: [AuthguardUserGuard], 
  },
  {
    path: 'formateur',
    loadChildren: () => import('./Formateur/formateur.module')
      .then(m => m.FormateurModule), canActivate: [AuthguardFormateurGuard], 
  },
  {
    path: 'responsable',
    loadChildren: () => import('./Admin/admin.module')
      .then(m => m.RespModule), canActivate: [AuthguardRespGuard], 
  },
  {
    path: '',
    loadChildren: () => import('./public/public.module')
      .then(m => m.PublicModule)
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
