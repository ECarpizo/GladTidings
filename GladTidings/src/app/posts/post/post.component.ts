import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from '../../services/user.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  /* when i createa new user, it updates the add the author table, but does not add it to the list of all users table.
    also, table paginator does not update dynamically for the add author table.....
  */

  // when editing user, available authors neds to update to, and so does thapaginator
  // maybe use event emitter.

  // table data
  userDataSource: MatTableDataSource<any>;
  tableColumns: string[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchInput: string;

  constructor(public postService: PostService, public userService: UserService) { }

  ngOnInit() {
    // set table columns
    if (this.tableColumns == undefined || this.tableColumns.length == 0)
      this.tableColumns = ['name', 'email', 'actions'];

    // the person creating the post is the main author.
    let authors;
    this.userService.getUserById(localStorage.getItem('userID')).subscribe(user => {
      authors = this.postService.getCurrentAuthors();
      authors.push(user)
      this.postService.setCurrentAuthors(authors);
    });
    authors = this.postService.getCurrentAuthors();

    // if the local array of users is empty
    if (this.userService.getCurrentUsers().length == 0) {
      // populate the table that will allow users to add other authors to the post.
      // First, retrieve all users from the database
      this.userService.getUsers().subscribe(resJson => {
        // save the users locally in the user service.
        this.userService.setCurrentUsers(resJson.users);

        // store the currentUser
        let currentUser = authors[0];
        resJson.users.forEach(element => {
          if (!element.active || element._id == currentUser._id) {
            // remove the current User and all deactivated users from the list of all users
            resJson.users.splice(resJson.users.indexOf(element), 1);
          }
        });
        // store the filtered list in a variable.
        let currentActiveUsers = resJson.users;
        // save the active users in the user service
        this.userService.setCurrentActiveUsers(currentActiveUsers);

        if (currentActiveUsers.length < 1)
          return
        else {
          this.userDataSource = new MatTableDataSource(currentActiveUsers);
          this.userDataSource.paginator = this.paginator;
          this.userDataSource.filterPredicate = (activeUsers, filter) => {
            if ((activeUsers.firstName + ' ' + activeUsers.lastName).toLowerCase().includes(filter) || activeUsers.firstName.toLowerCase().includes(filter) || activeUsers.lastName.toLowerCase().includes(filter))
              return true;
          };
        }
      });
    }
  }

  createPost() {
    let updatedCurrentPosts;
    this.postService.getCurrentPostsObs().subscribe(data => { updatedCurrentPosts = data });
    this.postService.createPost().subscribe(data => {
      updatedCurrentPosts.push(data);
      this.postService.setCurrentPosts(updatedCurrentPosts);
    });
  }

  editPost() {
    // store the values submitted by the user and any unchanged values.
    let _id = this.postService.form.get('$key').value;
    let title = this.postService.form.get('title').value;
    let subtitle = this.postService.form.get('subtitle').value;
    let authors = this.postService.form.get('authors').value;
    let content = this.postService.form.get('content').value;
    let categories = this.postService.form.get('categories').value;

    // store the index of the element to be modified
    let updatedUsers;
    let indexToMod;
    this.postService.getCurrentPostsObs().subscribe(currUsers => {
      updatedUsers = currUsers
      indexToMod = currUsers.map((element => { return element._id })).indexOf(_id);
    });

    // get the element stored in the database
    this.postService.getPostById(_id).subscribe(response => {
      // prepare it to be updated by changing its values
      response._id = _id;
      response.title = title
      response.subtitle = subtitle
      response.authors = authors
      response.content = content
      response.categories = categories
      // send it for update
      this.postService.updatePost(response).subscribe(res => {
        // update local's version of users
        updatedUsers[indexToMod] = res.post;
        this.postService.setCurrentPosts(updatedUsers);
      });
    });
  }

  submitPostForm() {
    // if (this.postService.form.get('$key').value != null)
    //   this.editForm();
    // else
    this.createPost();
    this.postService.form.reset();
    this.postService.initializeForm();
  }

  resetForm() {
    this.postService.form.reset();
    this.postService.initializeForm();
  }

  addAuthorToPost(author) {
    let authors = this.postService.getCurrentAuthors();
    authors.push(author)
    this.userDataSource.data.splice(this.userDataSource.data.indexOf(author), 1);
    this.userDataSource = new MatTableDataSource(this.userDataSource.data);
    this.userDataSource.paginator = this.paginator;
    this.postService.setCurrentAuthors(authors);
  }

  removeAuthorFromPost(author) {
    let authors = this.postService.getCurrentAuthors();
    authors.splice(authors.indexOf(author), 1);
    this.userDataSource.data.push(author);
    this.userDataSource = new MatTableDataSource(this.userDataSource.data);
    this.userDataSource.paginator = this.paginator;
    this.postService.setCurrentAuthors(authors);
  }

  addTagToPost(category) {
    let categories = this.postService.getCurrentCategories();
    categories.push(category);
    this.postService.setCurrentCategories(categories);
    console.log(this.postService.getCurrentCategories())
  }

  removeTagFromPost(category) {
    let categories = this.postService.getCurrentCategories();
    categories.splice(categories.indexOf(category), 1);
    this.postService.setCurrentCategories(categories);
  }

  onSearchClear() {
    this.searchInput = "";
    this.search();
  }

  search() {
    this.userDataSource.filter = this.searchInput.trim().toLowerCase();
  }
}
