import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private utilityService: UtilityService) { }

  ngOnInit() {
    if (this.utilityService.getCurrentPage() != 0)
      this.utilityService.setCurrentPage(0);
  }

}
