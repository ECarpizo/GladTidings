import { Injectable } from '@angular/core';
import { Comment } from '../classes/Comment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseUrlService } from '../services/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private baseUrlService: BaseUrlService) { }

  getComments(): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.baseUrlService.getBaseURL()+'/comments');
  }
  getCommentById(id): Observable<Comment> {
    return this.http.get<Comment>(this.baseUrlService.getBaseURL()+'/comments/getById/'+id);
  }
  getCommentsByUser(id): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrlService.getBaseURL()+'/comments/userComments/'+id)
  }
  createComment(name): Observable<Comment> {
    let comment = {
      'name': name
    }
    return this.http.post<Comment>(this.baseUrlService.getBaseURL()+'/comments/create', comment)
  }
  updateComment(comment: Comment): Observable<Comment> {
    let commentInfo = {
      'title': comment.title,
      'comment': comment.comment,
      'replies': comment.replies
    }
    this.http.put(this.baseUrlService.getBaseURL()+'/comments/update/'+comment._id, commentInfo);
    return this.getCommentById(comment._id);
  }
  deleteComment(id) {
    this.http.get(this.baseUrlService.getBaseURL()+'/comments/'+id);
  }
}
