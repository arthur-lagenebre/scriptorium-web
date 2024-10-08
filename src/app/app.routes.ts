import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "details",
        loadComponent: () => import('./components/card/card-details/card-details.component').then(c => c.CardDetailsComponent),
    }
];
