import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../../models/post.model';
import {environment} from '../../../environments/environment';
import {PostInterface} from '../../models/post.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiJsonPlaceHolderService {

  constructor(private http: HttpClient) {
  }

  public getPosts(): Observable<Array<Post>> {
    return this.http.get(environment.jsonPlaceHolderUrl + '/posts')
      .pipe(map((posts: Array<PostInterface>) =>
        posts.map((post: PostInterface) => new Post().createPostFromJson(post))));
  }
}
