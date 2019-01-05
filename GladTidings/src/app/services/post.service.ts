import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BaseUrlService } from '../services/base-url.service';
import { UserService } from './user.service';

import { Category } from '../classes/Category';
import { Post } from '../classes/Post';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService, private userService: UserService, private fb: FormBuilder) { }

  form: FormGroup = this.fb.group({
    $key: new FormControl(null),
    title: ['', [
      Validators.required
    ]],
    subtitle: ['', [
      Validators.required
    ]],
    authors: [[], [
      Validators.required
    ]],
    content: ['', [
      Validators.required,
      // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}$'),
      Validators.minLength(9),
      Validators.maxLength(20)
    ]],
    categories: [[]],
    active: [false]
  });

  private postsSource = new BehaviorSubject<Post[]>([]);
  // next we turn the Behavior Subject into an observable.
  private currentPosts = this.postsSource.asObservable();

  private authorsSource = new BehaviorSubject<Post[]>([]);
  private currentAuthors = this.authorsSource.asObservable();

  private categoriesSource = new BehaviorSubject<Post[]>([]);
  private currentCategories = this.categoriesSource.asObservable();

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrlService.getBaseURL() + '/posts');
  }
  getPostByTitle(title): Observable<Post> {
    return this.http.get<Post>(this.baseUrlService.getBaseURL() + '/posts/getByTitle/' + title);
  }
  getPostById(id): Observable<Post> {
    return this.http.get<Post>(this.baseUrlService.getBaseURL() + '/posts/' + id);
  }
  getPostsByUser(id): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrlService.getBaseURL() + '/posts/user/' + id);
  }
  createPost(): Observable<Post> {
    let postValues = {
      'title': this.form.get('title').value,
      'subtitle': this.form.get('subtitle').value,
      'authors': this.form.get('authors').value,
      'content': this.form.get('content').value,
      'categories': this.form.get('categories').value,
      'active': this.form.get('active').value
    }
    console.log(postValues)
    return this.http.post<Post>(this.baseUrlService.getBaseURL() + '/posts/create', postValues)
  }

  updatePost(post: Post): Observable<any> {
    let postInfo = {
      'title': post.title,
      'subtitle': post.subtitle,
      'authors': post.authors,
      'content': post.content,
      'categories': post.categories,
      'active': post.active
    }
    this.http.put(this.baseUrlService.getBaseURL() + '/posts/update/' + post._id, postInfo);
    return this.getPostById(post._id);
  }

  togglePost(post: Post, setting: boolean): boolean {
    let postInfo = post;
    postInfo.active = setting;
    this.http.put(this.baseUrlService.getBaseURL() + '/posts/update/' + post._id, postInfo);
    let flag: Post;
    this.getPostById(post._id).subscribe(data => flag = data);
    // if you want to turn the post on
    if (setting) {
      // return true if the post is active
      if (flag.active)
        return true;
      else
        return false;
    }
    // otherwise you want to turn it off
    else {
      // return true if the post is inactive
      if (!flag.active)
        return true;
      else
        return false;
    }
  }

  initializeForm() {
    this.form.setValue({
      $key: null,
      title: '',
      subtitle: '',
      authors: [this.userService.getCurrentUser()._id],
      content: '',
      categories: [],
      active: false
    });
  }

  // POSTS
  getCurrentPosts() {
    let currentPosts;
    this.currentPosts.subscribe(posts => currentPosts = posts);
    return currentPosts;
  }

  getCurrentPostsObs() {
    return this.postsSource;
  }

  setCurrentPosts(posts: Post[]) {
    this.postsSource.next(posts);
  }

  // AUTHORS
  getCurrentAuthors() {
    let currentAuthors;
    this.currentAuthors.subscribe(authors => currentAuthors = authors);
    return currentAuthors;
  }

  getCurrentAuthorsObs() {
    return this.authorsSource;
  }

  setCurrentAuthors(authors) {
    this.authorsSource.next(authors);
  }

  // CATEGORIES
  getCurrentCategories() {
    let currentCategories;
    this.currentCategories.subscribe(categories => currentCategories = categories);
    return currentCategories;
  }

  getCurrentCategoriesObs() {
    return this.categoriesSource;
  }

  setCurrentCategories(categories) {
    this.categoriesSource.next(categories);
  }
}
