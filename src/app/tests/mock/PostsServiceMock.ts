import {Post} from '../../models/post.model';
import {Observable, of} from 'rxjs';

export class PostsServiceMock {
  setPosts(posts: Array<Post>): void {
  }

  getPosts(): Observable<Array<Post>> {
    return of([new Post()]);
  }

  getPost(index: number): Observable<Post> {
    return of(new Post());
  }
}
