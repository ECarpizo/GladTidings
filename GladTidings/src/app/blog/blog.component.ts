import { Component, OnInit } from '@angular/core';
import { Post } from '../classes/Post';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: Post[];
  constructor() { }

  ngOnInit() {
  }

}
