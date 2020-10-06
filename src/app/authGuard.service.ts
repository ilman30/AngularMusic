import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate{

    constructor(private authService: AuthService, private router: Router){
        
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
            const allowedRoles = next.data.allowedRoles;
            console.log(this.authService.isAuthorized(allowedRoles));
            return this.authService.isAuthorized(allowedRoles);
    }
}