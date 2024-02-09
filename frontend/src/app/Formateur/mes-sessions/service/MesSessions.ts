// formations.service.ts
import { EMPTY, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { Formation } from '../../formations/models/formation';

import { UserService } from 'src/app/public/espace-public/login/userservice';


@Injectable({
  providedIn: 'root',
})
export class FormationsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,private userService:UserService) {}
  

  getFormationsByUserId(userId: string): Observable<{ formation: Formation; formateur: any }[]> {
    return this.http.get<Formation[]>(`${this.baseUrl}/formations/byFormateur/${userId}`).pipe(
      switchMap((formations) => {
        const formationRequests: Observable<{ formation: Formation; formateur: any }>[] = [];
  
        for (const formation of formations) {
          const formationRequest = this.http.get<any>(`${this.baseUrl}/signup/${formation.formateurId}`).pipe(
            map((formateur) => ({ formation, formateur }))
          );
          formationRequests.push(formationRequest);
        }
  
        if (formationRequests.length > 0) {
          return forkJoin(formationRequests);
        } else {
          return [];
        }
      })
    );
  }
  getAllCarts(id: any): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/carts/byFormId/' + id).pipe(
      switchMap((carts: any[]) => {
        const userRequests: Observable<any>[] = carts.map(cart => this.getUserInfo(cart.userId));
        return forkJoin([...userRequests]).pipe(
          map(users => carts.map((cart, index) => ({ ...cart, user: users[index] })))
        );
      })
    );
  }
  
  getUserInfo(id:any) {
    return this.http.get('http://localhost:3000/signup/' + id)
  }

}
