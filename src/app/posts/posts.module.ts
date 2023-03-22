import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostCreateComponent } from './pages/post-create/post-create.component';
import { PostEditComponent } from './pages/post-edit/post-edit.component';
import { HttpClientModule } from "@angular/common/http";
import { PostsService } from "./services/posts.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    PostDetailsComponent,
    PostListComponent,
    PostCreateComponent,
    PostEditComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
