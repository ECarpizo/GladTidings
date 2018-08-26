import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toggleOn = false;
  currentPage = 0;

  constructor() { }

  ngOnInit() {
  }

  /* At a certain screen width, the navbar will collapse.
  Clicking the toggle-navbar icon will trigger this method.
  */
  toggleNav(){
    this.toggleOn = !this.toggleOn;
    console.log(this.toggleOn);
  }

  /* Clicking a link will update the variable 'currentPage' to
  the index mapped to that link. The index will be used to set the
  currently 'active' class.
  */
  setPage(index){
    this.currentPage = index;
  }
}
