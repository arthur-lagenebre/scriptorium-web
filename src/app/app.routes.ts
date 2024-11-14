import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsGuard } from './components/card/details/details.guard';
import { cardResolver } from './resolvers/cardResolver';
import { Card } from "./models/card"

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    {
        path: "details/:id",
        loadComponent: () => import('./components/card/details/details.component').then(c => c.DetailsComponent),
        canActivate: [DetailsGuard],
        resolve: { card: cardResolver }
    },
    {
        path: "card-list",
        loadComponent: () => import('./components/card-list/card-list.component').then(c => c.CardListComponent)
    },
    {
        path: "about",
        loadComponent: () => import('./components/about/about.component').then(c => c.AboutComponent)
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
