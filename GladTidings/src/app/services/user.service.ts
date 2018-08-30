import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../classes/User';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

import { USERS } from '../dummy-data/credentials';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = "http://localhost:4200/api/user/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  users: User[];
  currentUser: User = null;

  constructor(private http: HttpClient, private router: Router) {
    this.users = USERS;
  }

  validateCredentials(email: string, password: string) {
    
    // return this.http.post('validate', { email: email, password: password });
  }

  getUserByCredentials(email: string, password: string) {
    return this.http.post('getUserByCredentials', { email, password });
  }

  login(email: string, password: string) {
    if (this.validateCredentials(email, password) !== null) {
      this.getUserByCredentials(email, password).subscribe(responseData => this.currentUser = responseData as User);
      // this.router.navigateByUrl('/home');
      // this.router.navigate(["Caliber/settings/screening/category"]);
    }
  }
}
