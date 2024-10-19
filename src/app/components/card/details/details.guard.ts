import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class DetailsGuard {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const id = route.paramMap.get('id');
        if (id === null || !(/^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/).test(id)) {
            alert('Invalid oracle id');
            this.router.navigate(['./']);

            return false;
        }
        
      return true;
    }
}