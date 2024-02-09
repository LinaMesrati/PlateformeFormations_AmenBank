import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GestFService {

  constructor(private http:HttpClient) { }
 
  getFormateurInfo() {
    return this.http.get('http://localhost:3000/signup/formresp');
  }
  getFormateur() {
    return this.http.get('http://localhost:3000/signup/formateurs');
  }

  getResponsable(){
    return this.http.get('http://localhost:3000/signup/responsable');
  }
  getFormationByFormateur(id:any) {
    return this.http.get(`http://localhost:3000/formations/byFormateur/${id}`);
  }
  
  responsbale(id: any): Observable<any> {
    const updatedDemande = { type: 'radmin' };
    return this.http.put<any>(`http://localhost:3000/signup/resp/${id}`, updatedDemande);
  }

  formateur(id: any): Observable<any> {
    const updatedDemande = { etat: 'formateur' };
    return this.http.put<any>(`http://localhost:3000/signup/formateur/${id}`, updatedDemande);
  }

  deleteForm = (formationId: any) => {
    return this.http.delete(`http://localhost:3000/signup/${formationId}`);
  }

}
