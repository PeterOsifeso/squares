import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../models/post.model';
import {PostsService} from '../services/posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit, OnDestroy {
  @Input() index: number;
  post: Post;
  displayText: string | number;
  currentPostPropIndex: number;
  postKeys: Array<string>;
  postSubscription: Subscription;

  constructor(private postService: PostsService) {
  }

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost(): void {
    this.postService.getPost(this.index).subscribe(
      post => {
        this.post = post;
        this.postKeys = Object.keys(this.post);
        this.currentPostPropIndex = 0;
        this.setDisplayText();
      }
    );
  }

  setDisplayText(): void {
    this.displayText = this.post[this.postKeys[this.currentPostPropIndex]];

  }

  toggleDisplayText(): void {
    if (this.currentPostPropIndex + 1 < this.postKeys.length) {
      this.currentPostPropIndex++;
    } else {
      this.currentPostPropIndex = 0;
    }
    this.setDisplayText();
  }

  isNumber(displayText: any): boolean {
    return !isNaN(displayText);
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
