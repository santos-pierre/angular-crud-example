import { Component } from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {Post} from "../../../models/post.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  posts: Post[] = [];
  isLoading: boolean;

  constructor(
    private readonly _postsService: PostsService
  ) {
    this.isLoading = true;
    this._postsService.getAll().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      }
    })
  }
}
