import {PostInterface} from './post.interface';

export class Post {
  private id: number;
  private userId: number;
  private title: string;
  private body: string;

  constructor() {
  }

  getUserId(): number {
    return this.userId;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getBody(): string {
    return this.body;
  }

  createPostFromJson(json: PostInterface): Post {
    const post = new Post();
    post.id = json.id;
    post.userId = json.userId;
    post.title = json.title;
    post.body = json.body;
    return post;
  }
}
