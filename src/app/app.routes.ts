import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'card/:id',
        loadComponent: () => import('./features/card/card-view.component')
            .then(m => m.CardViewComponent),
    }
];
