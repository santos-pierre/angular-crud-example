import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {Post} from "../../../models/post.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit{
  post!: Post;
  isLoading: boolean = false;
  constructor(
    private readonly _postsService: PostsService,
    private readonly _activatedRouter: ActivatedRoute,
    private readonly _router: Router,
  ) {
  }

  ngOnInit() {
    const postID = this._activatedRouter.snapshot.params['id'];

    this.isLoading = true;

    this._postsService.getOne(postID).subscribe({
      next: (post) => {
        this.post = post;
        this.isLoading = false;
      },
      error: (err) => {
        // Ici je fais une simple redirection, mais à vous de gérer les code status
        this._router.navigate(['/posts']);
      }
    })
  }

  delete() {
    this._postsService.delete(this.post.id).subscribe({
      next: () => {
        this._router.navigate(['/posts']);
      },
      error: () => {
        console.log("Suppression impossible");
      }
    })
  }
}
