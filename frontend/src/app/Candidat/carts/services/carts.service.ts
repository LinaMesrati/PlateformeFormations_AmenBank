import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }
  createNewCart(model:any) {
    return this.http.post('http://localhost:3000/carts', model )
  }

 

}
