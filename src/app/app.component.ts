import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiJsonPlaceHolderService} from './services/api/api-json-place-holder.service';
import {Subscription} from 'rxjs';
import {Post} from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  posts: Array<Post>;
  postSubscription: Subscription;
  errorMessage: string;

  constructor(private apiJsonPlaceHolderService: ApiJsonPlaceHolderService) {
  }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postSubscription = this.apiJsonPlaceHolderService.getPosts()
      .subscribe((posts: Array<Post>) => {
        this.posts = posts;
      }, (error: any) => {
        this.errorMessage = 'An error occurred. Try again later!';
      });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
