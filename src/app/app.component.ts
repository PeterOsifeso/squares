import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiJsonPlaceHolderService} from './services/api/api-json-place-holder.service';
import {Observable, Subscription} from 'rxjs';
import {Post} from './models/post.model';
import {PostsService} from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  postSubscription: Subscription;
  errorMessage: string;

  constructor(private apiJsonPlaceHolderService: ApiJsonPlaceHolderService,
              private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postSubscription = this.apiJsonPlaceHolderService.getPosts()
      .subscribe((posts: Array<Post>) => {
        this.postsService.setPosts(posts);
      }, (error: any) => {
        this.errorMessage = 'An error occurred. Try again later!';
      });
  }

  getPosts$(): Observable<Array<Post>> {
    return this.postsService.getPosts();
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
