import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SquareComponent} from './square.component';
import {Post} from '../models/post.model';
import {PostsService} from '../services/posts.service';
import {PostsServiceMock} from '../tests/mock/PostsServiceMock';
import {of, Subscription} from 'rxjs';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;
  let postsServiceMock: PostsService;
  const mockPost = new Post().createPostFromJson({userId: 1, id: 2, body: 'Hello world', title: 'Hello'});

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SquareComponent],
      providers: [
        {provide: PostsService, useClass: PostsServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
    postsServiceMock = TestBed.get(PostsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch post from service on component init', () => {
    const fetchPostsSpy = spyOn(component, 'fetchPost');
    component.ngOnInit();
    expect(fetchPostsSpy).toHaveBeenCalled();
  });

  it('should get post object keys and set display text on init', () => {
    const setDisplayTextSpy = spyOn(component, 'setDisplayText');
    const getPostServiceSpy = spyOn(postsServiceMock, 'getPost').and.returnValue(of(mockPost));
    component.index = 0;

    component.fetchPost();
    expect(getPostServiceSpy).toHaveBeenCalledWith(0);
    expect(component.post).toBeDefined();
    expect(JSON.stringify(component.post)).toBe(JSON.stringify(mockPost));
    expect(component.postKeys).toBeDefined();
    expect(component.currentPostPropIndex).toBeDefined();
    expect(component.currentPostPropIndex).toBe(0);
    expect(setDisplayTextSpy).toHaveBeenCalled();
  });

  it('should set displayText to the currently selected post property', () => {
    component.post = mockPost;
    component.postKeys = Object.keys(mockPost);
    component.currentPostPropIndex = 0; // post.id
    component.setDisplayText();

    expect(component.displayText).toBeDefined();
    expect(component.displayText).toBe(2);
  });

  it('should toggle display text based on post properties', () => {
    component.post = mockPost;
    component.postKeys = Object.keys(mockPost);
    component.currentPostPropIndex = 2; // title

    const setDisplayTextSpy = spyOn(component, 'setDisplayText').and.callThrough();
    component.toggleDisplayText();
    expect(setDisplayTextSpy).toHaveBeenCalled();
    expect(component.displayText).toBe('Hello world');

    // edge case
    component.currentPostPropIndex = component.postKeys.length - 1;
    component.toggleDisplayText();
    expect(component.currentPostPropIndex).toBe(0);
  });

  it('should check if a value is a number', () => {
    expect(component.isNumber('123')).toBeTruthy();
    expect(component.isNumber(123)).toBeTruthy();
    expect(component.isNumber('xyz')).toBeFalsy();
  });

  it('should unsubscribe from post subscription on component destroy', () => {
    component.postSubscription = new Subscription();
    component.ngOnDestroy();
    expect(component.postSubscription.closed).toBeTruthy();
  });
});
