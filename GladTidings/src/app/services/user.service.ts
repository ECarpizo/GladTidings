import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/User';
import { UserResponse } from '../classes/UserResponse';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BaseUrlService } from '../services/base-url.service';

import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // How to code http methods
  //https://www.techiediaries.com/angular-http-client/

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService, private fb: FormBuilder) {
  }

  standardUsersEditForm: FormGroup = this.fb.group({
    $key: new FormControl(null),
    firstName: ['', [
      Validators.required
    ]],
    lastName: ['', [
      Validators.required
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}$'),
      Validators.minLength(9),
      Validators.maxLength(20)
    ]]
  });
  adminsEditForm: FormGroup = this.fb.group({
    $key: new FormControl(null),
    firstName: ['', [
      Validators.required
    ]],
    lastName: ['', [
      Validators.required
    ]],
    email: ['', [
      Validators.required,
      // Validators.email
    ]],
    password: ['', [
      Validators.required,
      // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}$'),
      // Validators.minLength(9),
      Validators.maxLength(20)
    ]],
    tier: new FormControl('Standard', Validators.required),
  });

  private userSource = new BehaviorSubject<User>(null);
  private currentUser = this.userSource.asObservable();

  // Variables for Sibling-Sibling Communication
  // Allows for communication between sibling components.
  // Every component consuming this service will receive the most up to date data.
  // First, we create a Behavior Subject with an initial value of [].
  private usersSource = new BehaviorSubject<User[]>([]);
  // next we turn the Behavior Subject into an observable.
  private currentUsers = this.usersSource.asObservable();

  private activeUsersSource = new BehaviorSubject<User[]>([]);
  private currentActiveUsers = this.activeUsersSource.asObservable();

  // CURRENT USER
  getCurrentUser(): User {
    let currentUser;
    this.currentUser.subscribe(user => currentUser = user);
    return currentUser;
  }
  getCurrentUserObs() {
    return this.currentUser;
  }
  // Update the Behavior Subject's current array of users to the parameter value of 'users'
  setCurrentUser(user): void {
    this.usersSource.next(user);
  }

  // CURRENT USERS
  getCurrentUsers() {
    let currentUsers;
    this.currentUsers.subscribe(users => currentUsers = users);
    return currentUsers;
  }
  getCurrentUsersObs() {
    return this.currentUsers;
  }
  setCurrentUsers(users: User[]) {
    this.usersSource.next(users);
  }

  // CURRENT ACTIVE USERS
  getCurrentActiveUsers() {
    let currentActiveUsers;
    this.currentActiveUsers.subscribe(users => currentActiveUsers = users);
    return currentActiveUsers;
  }
  getCurrentActiveUsersObs() {
    return this.currentActiveUsers;
  }
  setCurrentActiveUsers(users: User[]) {
    this.activeUsersSource.next(users);
  }
  updateCurrentActiveUsers(id, setting){
    this.currentActiveUsers.subscribe(users => {
      users.forEach(element => {
        if(element._id == id){
          element.active = setting;
        }
      });
      this.activeUsersSource.next(users);
    });
  }

  // CACHED INFO
  getCachedId(): string {
    return localStorage.getItem('userID');
  }
  getCachedUserType(): string {
    return localStorage.getItem('userType');
  }

  // CRUD Operations
  createUser(firstName, lastName, email, password, tier): Observable<User> {
    let user = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'password': password
    };
    if (tier != null)
      user['tier'] = tier;
    return this.http.post<User>(this.baseUrlService.getBaseURL() + '/users/create', user);
  }
  getUsers(): Observable<UserResponse> {
    // return this.http.get<User[]>(this.baseUrlService.getBaseURL() + '/users');
    return this.http.get<UserResponse>(this.baseUrlService.getBaseURL() + '/users');
  }
  getUserByCredentials(email: string, password: string): Observable<User> {
    const values = {
      email: email,
      password: password
    };
    return this.http.post<User>(this.baseUrlService.getBaseURL() + '/users/getByCredentials', values);
  }
  getUserByPost(emails: string, firstNames: string, lastNames: string): Observable<User> {
    const values = {
      emails: emails,
      firstNames: firstNames,
      lastNames: lastNames
    };
    return this.http.post<User>(this.baseUrlService.getBaseURL() + '/users/getByCredentials', values);
  }
  getUserById(id): Observable<User> {
    return this.http.get<User>(this.baseUrlService.getBaseURL() + '/users/getById/' + id);
  }
  updateUser(user: User): Observable<any> {
    let userInfo = {
      'firstName': user.firstName,
      'lastName': user.lastName,
      'email': user.email,
      'password': user.password,
      'tier': user.tier,
      'active': user.active,
      'comments': user.comments,
      'posts': user.posts
    };
    return this.http.put(this.baseUrlService.getBaseURL() + '/users/update/' + user._id, userInfo);
  }
  toggleUserActivation(user: User, setting: boolean, id) {
    let userInfo = {
      'active': setting,
    };
    let indexToMod;
    let response;
    if (user != undefined)
      this.http.put(this.baseUrlService.getBaseURL() + '/users/toggle/' + user._id, userInfo).subscribe((data: any) => {
        // this.currentUsers.subscribe(users => {
        //   indexToMod = users.map((element => { return element._id })).indexOf(user._id);
        //   response = {
        //     indexToMod: indexToMod,
        //     updatedUser: data.user
        //   }
        //   users[indexToMod] = data.user;
        //   this.usersSource.next(users);
        // });
      });
    else
      this.http.put(this.baseUrlService.getBaseURL() + '/users/toggle/' + id, userInfo).subscribe((data: any) => {
        // this.currentUsers.subscribe(users => {
        //   indexToMod = users.map((element => { return element._id })).indexOf(id);
        //   response = {
        //     indexToMod: indexToMod,
        //     updatedUser: data.user
        //   }
        //   users[indexToMod] = data.user;
        //   this.usersSource.next(users);
        // });
      });
  }

  deleteUser(id): Observable<any> {
    return this.http.get<any>(this.baseUrlService.getBaseURL() + '/users/delete/' + id._id);
  }

  // Create User Form
  initializeAdminForm() {
    this.adminsEditForm.setValue({
      $key: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      tier: 'Standard'
    });
  }

  populateEditUserForm(user) {
    this.adminsEditForm.setValue({
      $key: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      tier: user.tier
    });
  }
}
