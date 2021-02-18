import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import {Post} from '../models/post.model';

let service: PostsService;
describe('PostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(PostsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set posts', () => {
    const nextSpy = spyOn(service.post$, 'next');
    const mockPosts = [new Post()];
    service.setPosts(mockPosts);
    expect(nextSpy).toHaveBeenCalledWith(mockPosts);
  });

  it('should get all posts', () => {
    const postsAsObservableSpy = spyOn(service.post$, 'asObservable');
    service.getPosts();
    expect(postsAsObservableSpy).toHaveBeenCalledWith();
  });

  it('should get a post at an index', () => {
    const mockPosts = [new Post()];
    service.setPosts(mockPosts);
    service.getPost(0).subscribe((post: Post) => {
      expect(post).toBeDefined();
      expect(JSON.stringify(post)).toBe(JSON.stringify(mockPosts[0]));
    }, fail);
  });
});
