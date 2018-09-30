import { Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../classes/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  toggleDropDown = false;
  toggleLogout = false;
  currentPage = 0;
  showSettings = false;
  constructor(private userService: UserService, private router: Router) {
    if(this.userService.getCurrentUser() == null && localStorage.getItem('userID') == null)
      this.toggleLogout = false;
    else if(this.userService.getCurrentUser() == null && localStorage.getItem('userID') != null) {
      let user: User;
      this.userService.getUserById(localStorage.getItem('userID')).subscribe(data => {user = data;
        this.userService.setCurrentUser(user);
      });
      this.toggleLogout = true;
    }
    else
      this.toggleLogout = true;
    if(userService.getCurrentUser() != null && userService.getCurrentUser().tier == "Admin")
      this.showSettings = true;
  }

  /* At a certain screen width, the navbar will collapse.
  Clicking the toggle-navbar icon will trigger this method.
  */
 toggleNavDropDown(){
    this.toggleDropDown = !this.toggleDropDown;
  }

  /* Clicking a link will update the variable 'currentPage' to
  the index mapped to that link. The index will be used to set the
  currently 'active' class.
  */
  setPage(index){
    this.currentPage = index;
  }

  logout() {
    localStorage.removeItem('userID');
    localStorage.removeItem('userType');
    this.userService.setCurrentUser = null;
    this.toggleDropDown=false;
    window.location.reload(true);
    this.toggleLogout = false;
    this.showSettings = false;
    this.router.navigate(['/home']);
  }
}
