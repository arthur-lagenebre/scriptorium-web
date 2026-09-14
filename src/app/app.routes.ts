import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth/callback',
        loadComponent: () => import('./core/auth/auth-callback.component').then(m => m.AuthCallbackComponent)
    },
    {
        path: '',
        loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent)
    },
    {
        path: 'card/:id',
        loadComponent: () => import('./features/card/card-view.component').then(m => m.CardViewComponent)
    }
];
