import { Component, OnInit } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GladTidings';
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private userService: UserService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    // uncommenting the two lines below will remove the cookies when closing the program
    // localStorage.removeItem('userID');
    // localStorage.removeItem('userType');
    if (localStorage.getItem('userID') != null && this.userService.getCurrentUser() == null) {
      this.userService.getUserById(localStorage.getItem('userID')).subscribe(data => {
        this.userService.setCurrentUser(data);
      });
    }
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  // onActivate(event) {
  //   let scrollToTop = window.setInterval(() => {
  //       let pos = window.pageYOffset;
  //       if (pos > 0) {
  //           window.scrollTo(0, pos - 20); // how far to scroll on each step
  //       } else {
  //           window.clearInterval(scrollToTop);
  //       }
  //   }, 16);
  // }


}
