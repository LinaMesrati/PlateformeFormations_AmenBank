import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {


  constructor(private http:HttpClient) { }
  getAllFormations = () => {
    return this.http.get('http://localhost:3000/formations');
  }

  getAllCategories = () => {
    return this.http.get('http://localhost:3000/categories');
  }

  getFormsByCategories = (cat: string) => {
    return this.http.get(`http://localhost:3000/formations/byCateg?categ=${cat}`);
  }
  
  getFormsById = (id: any) => {
    return this.http.get(`http://localhost:3000/formations/${id}`);
  }

  getAllCarts(formId: any): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/carts/byFormId/${formId}`);
  }
 
}