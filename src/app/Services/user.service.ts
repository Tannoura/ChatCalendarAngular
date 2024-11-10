import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  private baseUrl = 'http://localhost:8085/user';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/list`);
  }

  addUser(nom: string, photo: File): Observable<any> {
    // Créez un objet FormData pour inclure le nom et la photo
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('photo', photo);

    // Envoyer la requête POST avec les données FormData
    return this.http.post<any>(`${this.baseUrl}/add`, formData);
  }

}
