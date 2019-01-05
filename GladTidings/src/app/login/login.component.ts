import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  hidePassword = true;
  panelOpenState = false;
  toggleLogin = false;
  toggleRegister = false;
  loginPromptText;
  registerPromptText;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private utilityService: UtilityService) {
    this.loginForm = this.fb.group({
      loginEmail: ['', [
        Validators.required,
        Validators.email
      ]],
      loginPassword: ['', [
        Validators.required,
        // Validators.pattern('(?=.*[0-9])(?=.*[a-ZA-Z])([a-zA-Z0-9]+)$'),
        // Validators.minLength(8),
        // Validators.maxLength(20)
      ]]
    });
    this.registerForm = this.fb.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      registerEmail: ['', [
        Validators.required,
        Validators.email
      ]],
      registerPassword: ['', [
        Validators.required,
        // Validators.pattern('(?=.*[0-9])(?=.*[a-ZA-Z])([a-zA-Z0-9]+)$'),
        // Validators.minLength(8),
        // Validators.maxLength(20)
      ]]
    });
  }

  ngOnInit() {
    if (this.userService.getCurrentUser() == null)
      this.loginPromptText = 'Login';
    else
      this.loginPromptText = 'Logout';
    this.registerPromptText = 'Register';
  }

  getLoginEmail() {
    return this.loginForm.get('loginEmail');
  }

  getLoginPassword() {
    return this.loginForm.get('loginPassword');
  }

  getRegisterFirstName() {
    return this.registerForm.get('firstName');
  }

  getRegisterLastName() {
    return this.registerForm.get('lastName');
  }

  getRegisterEmail() {
    return this.registerForm.get('registerEmail');
  }

  getRegisterPassword() {
    return this.registerForm.get('registerPassword');
  }

  getErrorMessage() {
    if(this.loginForm.controls.loginEmail.hasError('required'))
      return 'Please enter a valid email.';
  }

  login() {
    this.userService.getUserByCredentials(this.loginForm.value.loginEmail, this.loginForm.value.loginPassword).subscribe(data => {
      this.toggleLogin = !this.toggleLogin
      this.loginPromptText = 'Log In';
      this.loginForm.reset();
      if (data._id !== undefined || data._id !== null) {
        this.userService.setCurrentUser(data);
        localStorage.setItem("userID", data._id);
        localStorage.setItem("userType", data.tier);
        this.router.navigate(['/home']);
      }
    });
  }

  register() {
    this.userService.createUser(this.registerForm.value.firstName, this.registerForm.value.lastName, this.registerForm.value.registerEmail, this.registerForm.value.registerPassword, null).subscribe(data => {
      // could optimize by not subscribing.
      this.toggleRegister = !this.toggleRegister;
      this.registerPromptText = 'Register';
      this.registerForm.reset();
      this.router.navigate(['/login']);
    });
  }

  toggleLoginForm() {
    if (this.userService.getCurrentUser() != null)
      this.utilityService.logout();
    else {
      // flag controlling whether or not the form shows
      this.toggleLogin = !this.toggleLogin;
      // if the register button is open, close it
      if (this.toggleRegister) {
        this.toggleRegister = !this.toggleRegister;
      }
      // change the Login prompt to a Back prompt
      // and vice versa
      if (this.loginPromptText == 'Login')
        this.loginPromptText = 'Back';
      else {
        this.loginPromptText = 'Login';
        // reset the form values if going Back
        this.loginForm.reset();
      }
    }
  }

  toggleRegisterForm() {
    this.toggleRegister = !this.toggleRegister;
    if (this.toggleLogin) {
      this.toggleLogin = !this.toggleLogin;
    }
    if (this.registerPromptText == 'Register')
      this.registerPromptText = 'Back';
    else {
      this.registerPromptText = 'Register';
      this.registerForm.reset();
    }
  }
}
