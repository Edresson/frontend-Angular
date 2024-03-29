


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { AuthUtilService } from './auth-util.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor(private router: Router, private authUtil: AuthUtilService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        if(!isNullOrUndefined(this.authUtil.currentTokenValue)){
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}