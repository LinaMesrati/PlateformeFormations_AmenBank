import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  constructor(private http: HttpClient) {}

  getCartsByDateRange(start: Date): Observable<any[]> {
    const params = { date: start.toISOString() };
    return this.http.get<any[]>('http://localhost:3000/carts', { params });
  }

  getAllCarts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/carts')
  }

  deleteCart(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/carts/${id}`);
  }

  
}
