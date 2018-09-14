import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../classes/User';
import { Observable } from 'rxjs/Observable';

import { BaseUrlService } from '../services/base-url.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // How to code http methods
  //https://www.techiediaries.com/angular-http-client/

  private users: User[];
  private currentUser: User = null;

  constructor(private http: HttpClient, private router: Router, private baseUrlService: BaseUrlService) {
  }

  getCurrentUser(): User {
    return this.currentUser;
  }
  setCurrentUser(user: User): void {
    this.currentUser = user;
  }
  getUsersArray(): User[] {
    return this.users;
  }
  public getCachedId(): string {
    return localStorage.getItem('userID');
  }
  public getCachedUserType(): string {
    return localStorage.getItem('userType');
  }
  addUser(firstName, lastName, email, password): Observable<User> {
    let user = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'password': password
    }
    return this.http.post<User>(this.baseUrlService.getBaseURL() + '/users/create', user);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrlService.getBaseURL() + '/users');
  }
  getUserByCredentials(email: string, password: string): Observable<User> {
    const values = {
      email: email,
      password: password
    }
    return this.http.post<User>(this.baseUrlService.getBaseURL() + '/users/getByCredentials', values);
  }
  getUserById(id): Observable<User> {
    return this.http.get<User>(this.baseUrlService.getBaseURL() + '/users/getById/' + id);
  }
  updateUser(user: User): Observable<User> {
    let userInfo = {
      'firstName': user.firstName,
      'lastName': user.lastName,
      'email': user.email,
      'password': user.password,
      'tier': user.tier,
      'active': user.active
    }
    this.http.put(this.baseUrlService.getBaseURL() + '/users/update/' + user._id, userInfo);
    return this.getUserById(user._id);
  }
  deleteUser(user: User): boolean {
    let userInfo = {
      'firstName': user.firstName,
      'lastName': user.lastName,
      'email': user.email,
      'password': user.password,
      'tier': user.tier,
      'active': 'false'
    }
    this.http.put(this.baseUrlService.getBaseURL() + '/update/' + user._id, userInfo);
    let flag: User;
    this.getUserById(user._id).subscribe(data => flag = data);
    if (flag.active.toString() == "true")
      return false;
    else
      return true;
  }
}
