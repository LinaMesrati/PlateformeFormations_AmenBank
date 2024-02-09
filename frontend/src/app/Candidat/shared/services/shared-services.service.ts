import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserService } from 'src/app/public/espace-public/login/userservice';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService  {

  constructor(private userS:UserService, private http:HttpClient) { }

  getUser=()=>{
    return this.http.get("http://localhost:3000/signup/"+this.userS.getUserId())
  }
}
