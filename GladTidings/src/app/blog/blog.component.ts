import { Component, OnInit } from '@angular/core';
import { Post } from '../classes/Post';
import { PostService } from '../services/post.service';
import { UtilityService } from '../services/utility.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: Post[];
  constructor(private postService: PostService, private utilityService: UtilityService) {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
      // console.log(data);
      // console.log("Blog component posts' value: ");
      console.log(this.posts);
    });
  }
  ngOnInit() {
    if (this.utilityService.getCurrentPage() != 1)
      this.utilityService.setCurrentPage(1);
  }

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [1, 5, 10, 25, this.length];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}
