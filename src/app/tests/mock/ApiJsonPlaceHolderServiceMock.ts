import {Observable, of} from 'rxjs';
import {Post} from '../../models/post.model';

export class ApiJsonPlaceHolderServiceMock {
  public getPosts(): Observable<Array<Post>> {
    return of([new Post()]);
  }
}
