import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: "details",
        loadComponent: () => import('./components/card/details/details.component').then(c => c.DetailsComponent),
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
