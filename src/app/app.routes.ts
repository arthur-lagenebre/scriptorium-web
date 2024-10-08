import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/home/welcome/welcome.component';

export const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    {
        path: "details",
        loadComponent: () => import('./components/card/card-details/card-details.component').then(c => c.CardDetailsComponent),
    },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];
