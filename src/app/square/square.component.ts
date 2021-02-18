import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../models/post.model';
import {PostsService} from '../services/posts.service';
import {Subscription} from 'rxjs';
import {PostProp} from '../models/post-prop.enumeration';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit, OnDestroy {
  @Input() index: number;
  post: Post;
  postSubscription: Subscription;
  displayNum: number;
  postProp: PostProp;

  constructor(private postService: PostsService) {
  }

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost(): void {
    this.postSubscription = this.postService.getPost(this.index).subscribe(
      post => {
        this.post = post;
        this.toggleDisplayNum();
      }
    );
  }

  toggleDisplayNum(): void {
    if (this.postProp === PostProp.id) {
      this.postProp = PostProp.userId;
      this.displayNum = this.post.getUserId();
    } else {
      this.postProp = PostProp.id;
      this.displayNum = this.post.getId();
    }
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
