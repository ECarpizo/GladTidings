import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toggleOn = false;

  constructor() { }

  ngOnInit() {
  }

  toggleNav(){
    this.toggleOn = !this.toggleOn;
    console.log(this.toggleOn);
  }
}
