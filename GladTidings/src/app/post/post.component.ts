import { Component, OnInit } from '@angular/core';
import { Post } from '../classes/Post';
import { Comment } from '../classes/Comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
