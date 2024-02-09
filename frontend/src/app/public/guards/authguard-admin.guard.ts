// authguard-admin.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../espace-public/login/userservice';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthguardAdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router,
 ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.userService.getUserType().pipe(
      map(userType => {
        if (userType === 'admin') {
          return true; 
        } else {
  
          alert("Unauthorized Access");
       
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }
}
