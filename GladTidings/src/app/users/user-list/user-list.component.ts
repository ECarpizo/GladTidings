import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // users;
  userDataSource: MatTableDataSource<any>;
  tableColumns: string[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchInput: string;
  //user to hide the password
  hidePassword = true;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    if (this.tableColumns == undefined || this.tableColumns.length == 0)
      this.tableColumns = ['firstName', 'lastName', 'email', 'password', 'tier', 'active', 'created', 'actions'];

    if (this.userService.getCurrentUsers().length == 0)
      this.userService.getUsers().subscribe(resJson => {
        this.userService.setCurrentUsers(resJson.users);
      });
    this.userService.getCurrentUsersObs().subscribe(data => {
      if (!data)
        return
      else {
        this.userDataSource = new MatTableDataSource(data);
        this.userDataSource.sort = this.sort;
        this.userDataSource.paginator = this.paginator;
        this.userDataSource.filterPredicate = (data, filter) => {
          if ((data.firstName + ' ' + data.lastName).toLowerCase().includes(filter) || data.firstName.toLowerCase().includes(filter) || data.lastName.toLowerCase().includes(filter) || data.email.toLowerCase().includes(filter))
            return true;
        };
      }
    });
  };

  onSearchClear() {
    this.searchInput = "";
    this.search();
  }

  search() {
    this.userDataSource.filter = this.searchInput.trim().toLowerCase();
  }

  edit(row) {
    this.userService.populateEditUserForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UserComponent, dialogConfig);
  }

  toggleUserActivation(_id, setting) {
    if(this.userService.getCurrentActiveUsers().length > 1 && this.userService.getCurrentUser()._id != _id) {
      this.userService.toggleUserActivation(null, !setting, _id);
      let users = this.userService.getCurrentUsers();
      users.forEach(element => {
        if(element._id == _id){
          element.active = !setting;
        }
      });
      this.userService.setCurrentActiveUsers(users);

      let activeUsers = this.userService.getCurrentActiveUsers();
      activeUsers.forEach(element => {
        if(element._id == _id){
          element.active = !setting;
        }
      });
      this.userService.setCurrentActiveUsers(activeUsers);
      console.log('ping')
      // updatedUsers.forEach(element => {
      //   if (element._id == _id) {
      //     indexToMod = updatedUsers.indexOf(element);
      //     console.log('I am the one')
      //   }
      // });
      // updatedUsers[indexToMod].active = !setting;
      // this.userService.setCurrentUsers(updatedUsers);

      // let indexToMod = updatedUsers.map((element => { return element._id })).indexOf(_id);
      // updatedUsers[indexToMod].active = !setting;
      // this.userService.setCurrentUsers(updatedUsers);
      // let indexToMod = users.map((element => { return element._id })).indexOf(_id);
      // users[indexToMod].active = !setting;
      // this.userService.setCurrentUsers(users);
    }
  }

  deleteUser(row) {
    let updatedCurrentUsers;
    this.userService.getCurrentUsersObs().subscribe(data2 => {
      updatedCurrentUsers = data2;
    })
    updatedCurrentUsers.splice(updatedCurrentUsers.indexOf(row), 1);
    this.userService.deleteUser(row).subscribe();
    this.userService.setCurrentUsers(updatedCurrentUsers);
  }

  create() {
    this.userService.initializeAdminForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UserComponent, dialogConfig);
  }
}
