import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { UtilityService } from '../services/utility.service';
import { CategoryService } from '../services/category.service';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';

import { Category } from '../classes/Category';
import { User } from '../classes/User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  // Post form fields
  postForm: FormGroup;
  color = 'primary';
  checked = false;
  // disabled = false;
  publish = false;
  searchText; // text in search bar
  activeCategories: Category[];
  activeUsers: User[];
  users: User[];

  //Category form
  categoryForm: FormGroup;
  constructor(private fb: FormBuilder, private postService: PostService, public userService: UserService, private categoryService: CategoryService, private utilityService: UtilityService) {
  }

  ngOnInit() {
    if (this.utilityService.getCurrentPage() != 3)
      this.utilityService.setCurrentPage(3);
    this.categoryForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
    this.postForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      subtitle: ['', [
        Validators.minLength(2)
      ]],
      articleContent: [''],
      // authors: this.fb.array([this.fb.group({
      //   firstName: [this.userService.getCurrentUser().firstName, [
      //     Validators.minLength(2),
      //     Validators.required
      //   ]],
      //   lastName: [this.userService.getCurrentUser().lastName, [
      //     Validators.minLength(2),
      //     Validators.required
      //   ]],
      //   email: [this.userService.getCurrentUser().email, [
      //     Validators.email,
      //     Validators.required
      //   ]]
      // })]),
      authors: this.fb.array([this.fb.group({
        firstName: ['', [
          Validators.minLength(2),
          Validators.required
        ]],
        lastName: ['', [
          Validators.minLength(2),
          Validators.required
        ]],
        email: ['', [
          Validators.email,
          Validators.required
        ]]
      })]),
      pictures: this.fb.array([this.fb.group({
        path: ['']
      })]),
      categories: this.fb.array([this.fb.group({
        name: ['']
      })]),
      publish: false
    });
    this.postForm.valueChanges.subscribe(console.log)
    this.userService.getUsers().subscribe(data => {
      this.users = data.users;
      // UNCOMMENT CODE BELOW IF WANT TO SHOW ONLY ACTIVE USERS
      // this.activeUsers = [];
      // data.users.forEach((element) => {
      //   if(element.active)
      //     this.activeUsers.push(element);
      // });
      // this.userService.updateUsers(this.activeUsers);


      //this.userService.updateUsers(this.users, null);
    });
    this.categoryService.getCategories().subscribe(data => {
      this.activeCategories = [];
      data.categories.forEach((element) => {
        if (element.active)
          this.activeCategories.push(element);
      });
      this.categoryService.updateCategories(this.activeCategories)
    });
    this.searchText = "";
  }

  createCategory() {
    const formValue = this.categoryForm.value.name;
    this.categoryService.createCategory(formValue).subscribe(data => {
      let category: Category = data.category;
      this.activeCategories.push(category);
      this.categoryService.updateCategories(this.activeCategories)
      this.categoryForm.reset();
    });
  }

  deleteCategory(category) {
    console.log(category)
    console.log(this.activeCategories)
    this.categoryService.deactivateCategory(category, false);
    this.activeCategories.splice(this.activeCategories.indexOf(category), 1);
    this.categoryService.updateCategories(this.activeCategories);
  }

  get authors() {
    return this.postForm.get('authors') as FormArray
  }
  get pictures() {
    return this.postForm.get('pictures') as FormArray
  }
  get categories() {
    return this.postForm.get('categories') as FormArray
  }

  addAuthor() {
    const author = this.fb.group({
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required
      ]]
    })
    this.authors.push(author);
  }
  addPicture() {
    const picture = this.fb.group({
      path: ['']
    })
    this.pictures.push(picture);
  }
  addCategory() {
    const category = this.fb.group({
      name: ['']
    })
    this.categories.push(category);
  }

  removeAuthor(i) {
    this.authors.removeAt(i)
  }
  removePicture(i) {
    this.pictures.removeAt(i)
  }
  removeCategory(i) {
    this.categories.removeAt(i)
  }

  togglePublish() {
    this.postForm.value.publish = !this.postForm.value.publish;
    this.publish = !this.publish;
  }
  // 1. get the IDs of every user for the post, based on email, firstname, and lastname
  // 2. need to get the IDs of every category
  // 3. if including a picture would need to create a new picture and receive it's ID back
  // 4. create the post, using providing the retrieved IDs for users, categories, and pictures.
  // 5. send back the ID of the newly created post
  // 6. push the newly created post ID onto each of the users posts array, which would have to be done by querying for them?
  addPost() {
    const formValue = this.postForm.value;
    // this.postService.addPost(formValue).subscribe(data => { console.log(data) });
  }
}
