import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../espace-public/login/userservice';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthguardUserGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.getUserType().pipe(
      map((userType) => {
        if (userType === 'user') {
          return true; 
        } else {
         
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }
  
}
