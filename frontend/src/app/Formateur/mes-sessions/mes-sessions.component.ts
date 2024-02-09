import { Component, OnInit } from '@angular/core';
import { FormationsService } from './service/MesSessions';
import { UserService } from 'src/app/public/espace-public/login/userservice';
import { Formation } from '../formations/models/formation';
import { Form } from '@angular/forms';
import { CartsService } from 'src/app/Responsable/carts/services/carts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-mes-sessions',
  templateUrl: './mes-sessions.component.html',
  styleUrls: ['./mes-sessions.component.css']
})
export class MesSessionsComponent implements OnInit {
  formations: any[] = [];
  carts:any[] = [];
  constructor(
    private formationsService: FormationsService,
    private authService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (userId) {
       this.getFormationsbyUser(userId);
    }
   
  }

getFormationsbyUser=(userId:any)=>{
  this.formationsService.getFormationsByUserId(userId).subscribe(
    (data: any) => {
      console.log('Formations data:', data);
      this.formations = data;
    }
  );

}

 detail=(content:any,id:any)=>
 {
    this.carts=[];
    this.getAllCarts(id);
    this.modalService.open(content, { size: 'xl' }); 
    
 }
 getAllCarts(id:any) {
  this.formationsService.getAllCarts(id).subscribe((res:any) => {
    this.carts = res
    console.log(this.carts);
  
  })
 
}
}

