import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, of, tap } from 'rxjs';

import { Beer } from '../model/beer';
import { BeerPage } from '../model/beer-page';

@Injectable({
  providedIn: 'root'
})
export class BeersService {
  private readonly API = 'https://beer-project-api.onrender.com/beersapi';

  private cache: Beer[] = [];

  constructor(private http: HttpClient) {}

  list(page = 0, pageSize = 10) {
    return this.http.get<BeerPage>(this.API, { params: { page, pageSize } }).pipe(
      first(),
      // map(data => data.courses),
      tap(data => (this.cache = data.beers))
    );
  }

  loadById(id: number) {
    if (this.cache.length > 0) {
      const record = this.cache.find(beer => `${beer.id}` === `${id}`);
      return record != null ? of(record) : this.getById(id);
    }
    return this.getById(id);
  }

  private getById(id: number) {
    return this.http.get<Beer>(`${this.API}/${id}`).pipe(first());
  }

  save(record: Partial<Beer>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  private update(record: Partial<Beer>) {
    return this.http.put<Beer>(`${this.API}/${record.id}`, record).pipe(first());
  }

  private create(record: Partial<Beer>) {
    return this.http.post<Beer>(this.API, record).pipe(first());
  }

  remove(id: number) {
    return this.http.delete<Beer>(`${this.API}/${id}`).pipe(first());
  }
}
