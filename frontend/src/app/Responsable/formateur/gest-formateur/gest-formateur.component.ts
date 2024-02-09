import { Component, OnInit } from '@angular/core';
import { GestFService } from '../service/gestForm';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-gest-formateur',
  templateUrl: './gest-formateur.component.html',
  styleUrls: ['./gest-formateur.component.css']
})
export class GestFormateurComponent implements OnInit{

  formateurs:any[]=[];
  formations:any[]=[];
  Allforms:any[]=[];
  p: number = 1;
  constructor(private service :GestFService,private modalService:NgbModal){}
  ngOnInit(): void {
      this.getAllFormateurs();
  }
  getAllFormateurs=()=> {
    this.service.getFormateurInfo().subscribe((res:any) => {
      this.formateurs = res
      
    })
    console.log(this.formateurs);
  }

 View=(event:any,id:any)=>
 {
  this.Allforms=[];
  this.service.getFormationByFormateur(id).subscribe((res:any)=>
  {
    this.formations=res;
    this.Allforms.push(this.formations);
  }
  )
 
  console.log(this.Allforms);
  console.log(id);
  this.modalService.open(event, { size: 'xl' }); 
 }
}
