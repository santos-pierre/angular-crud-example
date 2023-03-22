import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostListComponent} from "./pages/post-list/post-list.component";
import {PostCreateComponent} from "./pages/post-create/post-create.component";
import {PostEditComponent} from "./pages/post-edit/post-edit.component";
import {PostDetailsComponent} from "./pages/post-details/post-details.component";

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: PostCreateComponent,
  },
  {
    path: 'edit/:id',
    component: PostEditComponent
  },
  {
    path: ':id',
    component: PostDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
