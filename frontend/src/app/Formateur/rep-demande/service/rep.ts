import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { UserService } from 'src/app/public/espace-public/login/userservice';
import { FormationRequest } from '../../formations/models/formation-request';

@Injectable({
  providedIn: 'root'
})
export class repdemande {

    private baseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient,private userService:UserService) {}

    getDemandesByUserId(formateurId: any): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/demandes/byFormateur/${formateurId}`);
    }
  
    deleteDemande(demandeId: any): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/demandes/${demandeId}`);
    }
  
    
  }