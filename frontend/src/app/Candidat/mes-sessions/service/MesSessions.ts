// formations.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { Formation } from '../../formations/models/formation';
import { Cart } from '../../carts/model/cart';
import { UserService } from 'src/app/public/espace-public/login/userservice';

@Injectable({
  providedIn: 'root',
})
export class FormationsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private userService: UserService) {}

  desinscrireFormation(formId: any): Observable<any> {
    const userId = this.userService.getUserId();
    console.log('UserId:', userId);
    console.log('FormId:', formId);

    const url = `${this.baseUrl}/carts`;

    return this.http.get<Cart[]>(`${url}?userId=${userId}`).pipe(
        switchMap((carts) => {
            const cartWithForm = carts.find((cart) => {
                return cart.forms.some((form) => form.fomrId == formId);
            });

            console.log('Cart with Form:', cartWithForm);

            if (cartWithForm) {
                console.log("forms :", cartWithForm.forms)
                const updatedForms = cartWithForm.forms.filter((form) => form.fomrId != formId);
                console.log('Updated Forms:', updatedForms);

                const updatedCart = { ...cartWithForm, forms: updatedForms };
                console.log("updatedCart", updatedCart);
          
                // Check if the cart ID is defined
                if (cartWithForm.id) {
                    console.log(cartWithForm.id);
                    const updateUrl = `${url}/${cartWithForm.id}`;

                   
                        // Return the HTTP PUT request
                        return this.http.put(updateUrl, updatedCart).pipe(
                            catchError((error) => {
                                console.error("Error updating cart:", error);
                                // Handle error and return an observable
                                return throwError('Error updating cart');
                            })
                        );
                     
                      
                    
                } else {
                    console.error("Cart ID is undefined.");
                    return throwError('Cart ID is undefined');
                }
            } else {
                console.error(`Form with formId ${formId} not found in any cart.`);
                return throwError('Form not found in cart');
            }
        })
    );
}

  
  getFormationsByUserId(userId: number): Observable<Formation[]> {
    const url = `${this.baseUrl}/carts/byUser/${userId}`;

    return this.http.get<Cart[]>(url).pipe(
      switchMap((carts) => {
        const formationRequests: Observable<Formation>[] = [];

        for (const cart of carts) {
          for (const form of cart.forms) {
            formationRequests.push(this.http.get<Formation>(`${this.baseUrl}/formations/${form.fomrId}`));
          }
        }

        if (formationRequests.length > 0) {
          return forkJoin(formationRequests);
        } else {
          return [];
        }
      })
    );
  }
}
