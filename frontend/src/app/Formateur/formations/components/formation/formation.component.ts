import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Formation } from '../../models/formation';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit{
  @Input() item!:Formation
  @Output() form=new EventEmitter()
 constructor(){}
 ngOnInit(): void {
     
 }
 add=()=>{
  this.form.emit(this.item)
 }
}
