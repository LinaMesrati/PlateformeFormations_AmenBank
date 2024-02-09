import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { UserService } from '../../../../public/espace-public/login/userservice';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
 

  cartForms:any[]=[]
  Total:any=0
  success:boolean=false
  constructor(private service:CartsService,private userService:UserService){}
  ngOnInit(): void {
 
      this.getCartForms()
     
  }



  getCartForms=()=>
  {
    if ("cart" in localStorage)
    {
      this.cartForms=JSON.parse(localStorage.getItem("cart")!)
  }
  
  this.getCartTotal()
}

 getCartTotal=()=>
 {
    this.Total=0
    for(let x in this.cartForms)
    {
      this.Total+=this.cartForms[x].price
    }
 }
 
 deleteForm(index:number) {
  this.cartForms.splice(index , 1)
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.cartForms))
}
clearCart() {
  this.cartForms = []
  this.getCartTotal()
  localStorage.setItem("cart" , JSON.stringify(this.cartForms))
}
addCart=()=>
{
  let session=JSON.parse(localStorage.getItem("session")!)
  let forms=this.cartForms.map(item=>{
   return {fomrId:item.id}
  })
  const r=uuidv4()
  let Model =
  {
    id: r,
    userId:this.userService.getUserId(),
    date:new Date().toISOString().split('T')[0],
    forms:forms,
    session:session
  }
 
 this.service.createNewCart(Model).subscribe(res=>{
  this.success=true
 }
  )
  this.clearCart();
}
    
}
