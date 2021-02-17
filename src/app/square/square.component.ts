import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../models/post.model';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  @Input() post: Post;
  displayText: string | number;
  currentPostPropIndex: number;
  postKeys: Array<string>;

  constructor() {
  }

  ngOnInit(): void {
    this.postKeys = Object.keys(this.post);
    this.currentPostPropIndex = 0;
    this.setDisplayText();
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
}
