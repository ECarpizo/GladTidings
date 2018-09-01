import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../classes/User';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

import { BaseUrlService } from '../services/base-url.service';
import { USERS } from '../dummy-data/credentials';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // How to code http methods
  //https://www.techiediaries.com/angular-http-client/

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  users: User[];
  currentUser: User = null;

  constructor(private http: HttpClient, private router: Router, private baseUrlService: BaseUrlService) {
    this.users = USERS;
  }

  validateCredentials(email: string, password: string): boolean {
    const params = new HttpParams().set('email', email).set('password', password);
    let valid: boolean = false;
    this.http.request("POST", this.baseUrlService.getBaseURL + 'validateCredentials', { responseType: "json", params }).subscribe((data: boolean) => {
      if (data) {
        valid = true;
      }
    });
    return valid;
    // return this.http.post('validate', { email: email, password: password });
  }

  getUserByCredentials(email: string, password: string): Observable<User> {
    const params = new HttpParams().set('email', email).set('password', password);
    return this.http.post<User>(this.baseUrlService + 'getUserByCredentials', { responseType: "json", params });
  }

  login(email: string, password: string) {
    if (this.validateCredentials(email, password)) {
      this.getUserByCredentials(email, password).subscribe((data: User) => {
        this.currentUser = data;
        localStorage.setItem("userID", data.id.toString());
        localStorage.setItem("userType", data.tier.toString());
        this.router.navigate(['/home']);
      });
    }
  }

  logout() {
    localStorage.removeItem('userID');
    localStorage.removeItem('userType');
    this.router.navigate(['/login']);
  }

  public getCachedId(): string {
    return localStorage.getItem('userID');
  }

  public getCachedUserType(id: string): string {
    return localStorage.getItem('userType');
  }
}
