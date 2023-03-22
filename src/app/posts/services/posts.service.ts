import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../models/post.model";

@Injectable()
export class PostsService {
  private apiUrl: string = 'http://localhost:3000/posts';

  constructor(
    private readonly _http: HttpClient
  ) { }

  getAll() {
    return this._http.get<Post[]>(this.apiUrl);
  }

  getOne(id: number) {
    return this._http.get<Post>(`${this.apiUrl}/${id}`);
  }

  create(data: any) {
    return this._http.post<Post>(this.apiUrl, data);
  }

  update(id: number, data:any) {
    return this._http.put<Post>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this._http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
