import { Routes } from '@angular/router';

import { BeerViewComponent } from './components/beer-view/beer-view.component';
import { BeerFormComponent } from './containers/beer-form/beer-form.component';
import { BeersComponent } from './containers/beer/beer.component';
import { BeerResolver } from './resolver/beer.resolver';

export const BEERS_ROUTES: Routes = [
  { path: '', component: BeersComponent },
  { path: 'new', component: BeerFormComponent, resolve: { course: BeerResolver } },
  {
    path: 'edit/:id',
    component: BeerFormComponent,
    resolve: { beer: BeerResolver }
  },
  {
    path: 'view/:id',
    component: BeerViewComponent,
    resolve: { beer: BeerResolver }
  }
];
