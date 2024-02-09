import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartsService } from '../../services/carts.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormationService } from 'src/app/Responsable/formations/services/formation.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  constructor(private service:CartsService , private build:FormBuilder , private formService:FormationService, private modalService: NgbModal) { 
  }
  show:boolean=false;
  carts:any[] = [];
  forms:any[] = [];
  total = 0
  form!:FormGroup;
  details:any;
  session:any[]=[];
  p: number = 1;
  ngOnInit(): void {
   this.form = this.build.group({
     start: [''],
     end:['']
   })
    this.getAllCarts()
  }



  getAllCarts() {
    this.service.getAllCarts().subscribe((res:any) => {
      this.carts = res
      console.log(this.carts);
    })
  }

  applyFilter() {
 
    this.service.getCartsByDateRange(this.form.value.start).subscribe((res: any) => {
      this.carts = res;
    
    });

  }

  deleteCart(id:number) {
    this.service.deleteCart(id).subscribe(res => {
      this.getAllCarts()
      alert("Cart deleted Success")
    })
  }
 
  
  view(index:number,content:any) {
    this.forms = []
    this.details = this.carts[index];
    for(let x in this.details.forms) {
      this.formService.getFormsById(this.details.forms[x].fomrId).subscribe(res => {
        this.forms.push({item: res })
      })
    }
    console.log("forms",this.forms);
    this.show=true
    console.log(this.forms);
    this.modalService.open(content, { size: 'xl' }); 
  } 
}
