import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { UserService } from '../services/user.service';
import { User } from '../classes/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // NOTES: for someone reason, when you click the 'Home' button, the 'Settings' option disappears. Not sure why....

  toggleDropDown = false;
  toggleLogout = false;
  currentPage = 0;
  showSettings = false;
  constructor(private userService: UserService, private router: Router, private utilityService: UtilityService) {

    // if there is no cookie for a user still being logged in and the current user is false.
    if (localStorage.getItem('userID') == null && this.userService.getCurrentUser() == null) {
      // display the login option on the navbar
      this.toggleLogout = false;
    }
    // if there is a cookie
    else {
      // check if current user has been set.
      if (this.userService.getCurrentUser() == null) {

        // if the the current user has not been set, query for the user by ID
        this.userService.getUserById(localStorage.getItem('userID')).subscribe(data => {
          // set the current user to the response
          this.userService.setCurrentUser(data);
          // check if the user is an admin.
          if (data.tier == "Admin")
            // if the user is an admin, display the settings option in the navbar.
            this.showSettings = true;
        });

      }
      // if the current user has already been set
      else {

        // check if the user is an admin.
        if (this.userService.getCurrentUser().tier == "Admin")
          // if the user is an admin, dispaly the settings option in the navbar.
          this.showSettings = true;
      }
      this.currentPage = this.utilityService.getCurrentPage();
      if (this.utilityService.getCurrentPage() == 3)
        this.showSettings = false;
      // display the logout option in the navbar.
      this.toggleLogout = true;
    }
  }

  ngOnInit() {
    if (this.userService.getCurrentUser() != null && this.userService.getCurrentUser().tier == "Admin")
      this.showSettings = true;
  }
  /* At a certain screen width, the navbar will collapse.
  Clicking the toggle-navbar icon will trigger this method.
  */
  toggleNavDropDown() {
    this.toggleDropDown = !this.toggleDropDown;
  }

  /* Clicking a link will update the variable 'currentPage' to
  the index mapped to that link. The index will be used to set the
  currently 'active' class.
  */
  setPage(index) {
    this.currentPage = index;
    this.utilityService.setCurrentPage(index);
  }

  logout() {
    // ORIGINAL CODE
    // localStorage.removeItem('userID');
    // localStorage.removeItem('userType');
    // this.userService.setCurrentUser = null;
    // this.toggleDropDown=false;
    // window.location.reload(true);
    // this.toggleLogout = false;
    // this.showSettings = false;
    // this.router.navigate(['/home']);

    this.utilityService.logout();
    this.toggleDropDown = false;
    this.toggleLogout = false;
    this.showSettings = false;
    this.router.navigate(['/home']);
  }
}
