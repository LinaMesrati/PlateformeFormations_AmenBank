import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../../services/formation.service';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.css']
})
export class FormationDetailsComponent implements OnInit{
 id:any
 data:any={}
 constructor(private router:ActivatedRoute,private service:FormationService){
  this.id= +this.router.snapshot.paramMap.get("id")!
 }
 ngOnInit(): void {
     this.getFormation()
 }
 getFormation=()=>
 {
  this.service.getFormsById(this.id).subscribe(res=>
  {this.data=res}
  )
 }

}
