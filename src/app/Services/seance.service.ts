import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seance } from '../Models/Seance';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private baseUrl = 'http://localhost:8085/seances'; // Endpoint de votre backend

  constructor(private http: HttpClient) { }

  getAllSeances(): Observable<Seance[]> {
    return this.http.get<Seance[]>(this.baseUrl);
  }

  addSeance(seance: Seance): Observable<Seance> {
    return this.http.post<Seance>(this.baseUrl, seance);
  }
}
