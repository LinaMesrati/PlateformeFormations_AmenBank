import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormationService {


  constructor(private http:HttpClient) { }
  getFormsById = (id: any) => {
    return this.http.get(`http://localhost:3000/formations/${id}`);
  }

  createForm = (model: any) => {
    return this.http.post('http://localhost:3000/formations/', model);
  }

  updateForm = (formationId: any, model: any) => {
    return this.http.put(`http://localhost:3000/formations/${formationId}`, model);
  }

  deleteForm = (formationId: any) => {
    return this.http.delete(`http://localhost:3000/formations/${formationId}`);
  }

  getAllFormations = () => {
    return this.http.get('http://localhost:3000/formations');
  }

  getAllCategories = () => {
    return this.http.get('http://localhost:3000/categories');
  }

  getFormsByCategories = (cat: string) => {
    return this.http.get(`http://localhost:3000/formations/byCategory?categ=${cat}`);
  }
  
}
