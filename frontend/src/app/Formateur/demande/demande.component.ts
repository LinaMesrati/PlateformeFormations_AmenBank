import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormationRequest } from '../formations/models/formation-request';
import { UserService } from '../../public/espace-public/login/userservice';
import { FormationService } from '../formations/services/formation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit{

  form!:FormGroup
  constructor(private http: HttpClient,
    private userService:UserService,
    private service:FormationService,
    private build :FormBuilder) {}
  ngOnInit(): void {
    const r=uuidv4()
    this.form = this.build.group({
      formateurId:this.userService.getUserId(),
      formationName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      category:['', [Validators.required]],
      description:['', [Validators.required]],
      etat:"en cours",
      id:r
    })
     
      this.getCategories()
     
  }
  
  Categories:string[]=[]
  
 
  submitFormationRequest() {
    this.http.post('http://localhost:3000/demandes', this.form.value)
      .subscribe(response => {
        console.log('Demande envoyée avec succès:', response);
        alert("Demande envoyée avec succès");
      });
      this.form.reset();
  }
 
  getCategories=()=>{
    
    this.service.getAllCategories().subscribe((res:any)=>{
      console.log(res);
        this.Categories=res
    })
  }
  getSelectedCategory(event:any) {
    this.form.get('category')?.setValue(event.target.value)
    console.log(this.form)
  }
}