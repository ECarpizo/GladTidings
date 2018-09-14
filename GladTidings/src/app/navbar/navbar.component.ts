import { Component, EventEmitter, Output} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../classes/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  toggleOn = false;
  toggleLogout = false;
  currentPage = 0;
  constructor(private userService: UserService) {
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
  }

  /* At a certain screen width, the navbar will collapse.
  Clicking the toggle-navbar icon will trigger this method.
  */
 toggleNavDropDown(){
    this.toggleOn = !this.toggleOn;
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
    this.toggleOn=false;
    window.location.reload(true);
    this.toggleLogout = false;
  }
}
