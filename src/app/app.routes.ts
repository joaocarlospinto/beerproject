import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'beerproject' },
  { path: 'about', pathMatch: 'full', redirectTo: 'beerproject/about' },
  {
    path: 'beerproject',
    loadChildren: () => import('./beers/beers.routes').then(m => m.BEERS_ROUTES)
  }
];
