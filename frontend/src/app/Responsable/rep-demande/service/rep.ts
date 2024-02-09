import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/public/espace-public/login/userservice';

@Injectable({
  providedIn: 'root'
})
export class repdemande {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private userService: UserService) {}

  getAlldemandes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/demandes`);
  }

  refuserDemande(demande: any): Observable<any> {
    const updatedDemande = { etat: 'refusé' };
    return this.http.put<any>(`${this.baseUrl}/demandes/refuse/${demande.id}`, updatedDemande);
  }

  accepterDemande(demande: any): Observable<any> {
    const updatedDemande = { etat: 'accepté' };
    return this.http.put<any>(`${this.baseUrl}/demandes/accept/${demande.id}`, updatedDemande);
  }
}
