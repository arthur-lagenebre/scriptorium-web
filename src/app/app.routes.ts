import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/card/details/details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    // {
    //     path: "details/:id",
    //     loadComponent: () => import('./components/card/details/details.component').then(c => c.DetailsComponent),
    // },
    { path: 'details/:id', component: DetailsComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
