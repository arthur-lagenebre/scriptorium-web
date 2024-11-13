import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class CardListGuard {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const cardName = route.paramMap.get('cardName');
        if (!cardName) {
            alert('Invalid card Name');
            this.router.navigate(['./']);

            return false;
        }
        
      return true;
    }
}