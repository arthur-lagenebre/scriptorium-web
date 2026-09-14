import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent)
    },
    {
        path: 'card/:id',
        loadComponent: () => import('./features/card/card-view.component').then(m => m.CardViewComponent)
    },
    {
        path: 'spike',
        loadComponent: () => import('./features/spike/forms-spike.component').then(m => m.FormsSpikeComponent)
    }
];
