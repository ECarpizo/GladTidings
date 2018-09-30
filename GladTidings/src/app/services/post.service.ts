import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BaseUrlService } from '../services/base-url.service';

import { Category } from '../classes/Category';
import { Post } from '../classes/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

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
  createPost(post): Observable<Post> {
    let postValues = {
      'title': post.title,
      'subtitle': post.subtitle,
      'authors': post.authors,
      'content': post.articleContent,
      'categories': post.categories,
      'active': post.publish
    }
    return this.http.post<Post>(this.baseUrlService.getBaseURL() + '/posts/create', postValues)
  }
  updatePost(post: Post): Observable<Post> {
    let postInfo = {
      'name': post.title
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
}
