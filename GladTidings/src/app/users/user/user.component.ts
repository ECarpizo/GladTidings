import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  //user to hide the password
  hidePassword = true;

  constructor(public userService: UserService, private postService: PostService, public dialogRef: MatDialogRef<UserComponent>) { }

  ngOnInit() {
  }

  submitUserForm() {
    if (this.userService.adminsEditForm.get('$key').value != null)
      this.editUser();
    else
      this.createUser();
    this.userService.adminsEditForm.reset();
    this.userService.initializeAdminForm();
    this.dialogRef.close();
  }

  createUser() {
    let updatedCurrentUsers = this.userService.getCurrentUsers();
    this.userService.createUser(
      this.userService.adminsEditForm.value.firstName,
      this.userService.adminsEditForm.value.lastName,
      this.userService.adminsEditForm.value.email,
      this.userService.adminsEditForm.value.password,
      this.userService.adminsEditForm.value.tier).subscribe(data => {
        updatedCurrentUsers.push(data);
        this.userService.setCurrentUsers(updatedCurrentUsers);
      });
  }

  editUser() {
    // store the values submitted by the user and any unchanged values.
    let _id = this.userService.adminsEditForm.get('$key').value;
    let firstName = this.userService.adminsEditForm.get('firstName').value;
    let lastName = this.userService.adminsEditForm.get('lastName').value;
    let email = this.userService.adminsEditForm.get('email').value;
    let password = this.userService.adminsEditForm.get('password').value;
    let tier = this.userService.adminsEditForm.get('tier').value;

    // store the index of the element to be modified
    let updatedUsers;
    let indexToMod;

    this.userService.getCurrentUsersObs().subscribe(currUsers => {
      updatedUsers = currUsers
      indexToMod = currUsers.map((element => { return element._id })).indexOf(_id);
    });

    // get the element stored in the database
    this.userService.getUserById(_id).subscribe(response => {
      // prepare it to be updated by changing its values
      response._id = _id;
      response.firstName = firstName
      response.lastName = lastName
      response.email = email
      response.password = password
      response.tier = tier

      // send it for update
      this.userService.updateUser(response).subscribe(res => {
        updatedUsers[indexToMod] = res.user;
        this.userService.setCurrentUsers(updatedUsers);
      });
    });
  }

  resetForm() {
    this.userService.adminsEditForm.reset();
    this.userService.initializeAdminForm();
    this.dialogRef.close();
  }
}
