import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'beerproject' },
  {
    path: 'beerproject',
    loadChildren: () => import('./beerproject/beer.routes').then(m => m.BEER_ROUTES)
  }
];
