import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// dependency injection or add service to providers array
@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ meesage: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((data) => {
        this.posts = data.posts;
        // inform the update
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title, content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
