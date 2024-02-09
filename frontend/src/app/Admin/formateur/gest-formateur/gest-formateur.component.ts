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
  selectedCategory: string = 'all';
  p: number = 1;
  constructor(private service :GestFService,private modalService:NgbModal){}
  ngOnInit(): void {
      this.getAllFormateurs();
      
  }
  filterFormateurs() {
    if (this.selectedCategory === 'all') {this.getAllFormateurs();}
      else if(this.selectedCategory === 'admin'){this.getResponsable()}
      else{this.getFormateurs();}
      
  }
  
  getAllFormateurs=()=> {
    this.service.getFormateurInfo().subscribe((res:any) => {
      this.formateurs = res
      
    })
    console.log(this.formateurs);
  }
  getFormateurs=()=> {
    this.service.getFormateur().subscribe((res:any) => {
      this.formateurs = res
      
    })
    console.log(this.formateurs);
  }
  getResponsable=()=> {
    this.service.getResponsable().subscribe((res:any) => {
      this.formateurs = res
      
    })
    console.log(this.formateurs);
  }
 responsable=(id:any)=>{

  this.service.responsbale(id).subscribe(
    () => {
      this.getAllFormateurs(); // Update demandes after successful refusal
    },
    (error) => {
      console.error('Error refusing demande:', error);
      // Handle error as needed
    }
  );
 
}
 formateur=(id:any)=>{
  
  this.service.formateur(id).subscribe(
    () => {
      this.getAllFormateurs(); // Update demandes after successful refusal
    },
    (error) => {
      console.error('Error refusing demande:', error);
      // Handle error as needed
    }
  );
  
 }


 delete(item:any) {
      
  if (!confirm('Are you sure you want to delete this formation?')) {
    return;
  }

  const formateurId = item.id;
  this.service.deleteForm(formateurId).subscribe((res :any) => {
    alert('Formateur supprimé avec succés');
    this.getAllFormateurs();
  });
}
}
