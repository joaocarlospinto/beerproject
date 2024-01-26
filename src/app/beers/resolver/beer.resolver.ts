import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Beer } from '../model/beer';
import { BeersService } from '../services/beers.service';

@Injectable({
  providedIn: 'root',
})
export class BeerResolver {

  constructor(private service: BeersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Beer> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ id: 0, name: '', type: '', origin: '', price: 0, rating: 0, image: '' });
  }
}
