import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = "http://localhost:3000/"


  constructor(private http: HttpClient) { }


  getAllUsers() {
    return this.http.get(`${this.url}users`)
  }
  addUser(userValue: any) {
    return this.http.post(`${this.url}users`, userValue)
  }
  updateUser(id: number, userValue: any) {
    return this.http.put(`${this.url}users/${id}`, userValue);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.url}users/${id}`);
  }
}
