import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GestFService {

  constructor(private http:HttpClient) { }
 
  getFormateurInfo() {
    return this.http.get('http://localhost:3000/signup/formateurs');
  }
  getFormationByFormateur(id:any) {
    return this.http.get(`http://localhost:3000/formations/byFormateur/${id}`);
  }

}
