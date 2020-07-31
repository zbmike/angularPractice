import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// dependency injection or add service to providers array
@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ meesage: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((data) => {
          return data.posts.map((post) => ({
            id: post._id,
            title: post.title,
            content: post.content,
          }));
        })
      )
      .subscribe((posts) => {
        this.posts = posts;
        // inform the update
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title, content };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((response) => {
        console.log(response);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
