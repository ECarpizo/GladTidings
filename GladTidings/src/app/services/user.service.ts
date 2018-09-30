import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) {
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
  getCachedId(): string {
    return localStorage.getItem('userID');
  }
  getCachedUserType(): string {
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
  getUserByPost(emails: string, firstNames: string, lastNames: string): Observable<User> {
    const values = {
      emails: emails,
      firstNames: firstNames,
      lastNames: lastNames
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
      'active': user.active,
      'comments': user.comments,
      'posts': user.posts
    }
    this.http.put(this.baseUrlService.getBaseURL() + '/users/update/' + user._id, userInfo);
    return this.getUserById(user._id);
  }
  deleteUser(user: User, setting: boolean): boolean {
    let userInfo = user;
    userInfo.active = setting;
    this.http.put(this.baseUrlService.getBaseURL() + '/users/update/' + user._id, userInfo);
    let flag: User;
    this.getUserById(user._id).subscribe(data => flag = data);
    // if you want to activate the user
    if (setting) {
      // return true if the user is active
      if (flag.active)
        return true;
      else
        return false;
    }
    // otherwise you want to deactivate the user
    else {
      // return true if the user is inactive
      if (!flag.active)
        return true;
      else
        return false;
    }
  }
}
