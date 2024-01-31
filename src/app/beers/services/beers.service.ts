import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, of, tap } from 'rxjs';

import { Beer } from '../model/beer';

@Injectable({
  providedIn: 'root'
})
export class BeersService {
 private readonly API = 'https://beer-project-api.onrender.com/beersapi';
 // private readonly API = 'http://localhost:8080/beersapi';
  private cache: Beer[] = [];

  constructor(private http: HttpClient) {}

  list( ): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.API)
      .pipe( );
  }

  loadById(id: number) {

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
    return this.http.delete(`${this.API}/${id}`, { responseType: 'text' }).pipe(first());
  }
}
