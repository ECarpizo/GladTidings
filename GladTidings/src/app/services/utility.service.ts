import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService{
  constructor(private userService: UserService, private router: Router) { }
  private currentPage = 0;

  getCurrentPage(): number {
    return this.currentPage;
  }

  // the current page resets if the app closes...
  // may need to use a cookie to keep track of the last page.
  setCurrentPage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  logout() {
    localStorage.removeItem('userID');
    localStorage.removeItem('userType');
    this.userService.setCurrentUser = null;
    window.location.reload(true);
  }
}
