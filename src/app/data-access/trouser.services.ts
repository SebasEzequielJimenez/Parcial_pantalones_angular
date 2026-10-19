import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trouser } from './trouser';

@Injectable({ providedIn: 'root' })
export class TrousersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/trousers';

  getAll(): Observable<Trouser[]> {
    return this.http.get<Trouser[]>(this.apiUrl);
  }

  getById(id: string): Observable<Trouser> {
    return this.http.get<Trouser>(`${this.apiUrl}/${id}`);
  }

  create(trouser: Omit<Trouser, 'id'>): Observable<Trouser> {
    return this.http.post<Trouser>(this.apiUrl, trouser);
  }
  
  update(id: string, trouser: Partial<Trouser>): Observable<Trouser> {
    return this.http.put<Trouser>(`${this.apiUrl}/${id}`, trouser);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}