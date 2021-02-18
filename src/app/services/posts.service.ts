import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Post} from '../models/post.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  post$: Subject<Array<Post>> = new BehaviorSubject<Array<Post>>([]);

  constructor() {
  }

  setPosts(posts: Array<Post>): void {
    this.post$.next(posts);
  }

  getPosts(): Observable<Array<Post>> {
    return this.post$.asObservable();
  }

  getPost(index: number): Observable<Post> {
    return this.post$.pipe(map((post: Array<Post>) => post[index]));
  }
}
