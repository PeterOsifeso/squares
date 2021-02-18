import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../models/post.model';
import {PostProp} from '../models/post-prop.enumeration';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  @Input() post: Post;
  displayNum: number;
  postProp: PostProp;

  constructor() {
  }

  ngOnInit(): void {
    this.toggleDisplayNum();
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
}
