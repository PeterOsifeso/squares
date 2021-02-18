import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApiJsonPlaceHolderService} from './services/api/api-json-place-holder.service';
import {ApiJsonPlaceHolderServiceMock} from './tests/mock/ApiJsonPlaceHolderServiceMock';
import {of, Subscription, throwError} from 'rxjs';
import {PostsService} from './services/posts.service';
import {PostsServiceMock} from './tests/mock/PostsServiceMock';
import {Post} from './models/post.model';

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;
let postsService: PostsService;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: ApiJsonPlaceHolderService, useClass: ApiJsonPlaceHolderServiceMock},
        {provide: PostsService, useClass: PostsServiceMock}
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    postsService = TestBed.get(PostsService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetch posts method on component init', () => {
    const fetchPostsSpy = spyOn<any>(component, 'fetchPosts');
    component.ngOnInit();
    expect(fetchPostsSpy).toHaveBeenCalled();
  });

  it('should fetch posts from service', () => {
    const apiJsonPlaceHolderServiceMock = TestBed.get(ApiJsonPlaceHolderService);
    const mockPosts = [new Post()];
    const getPostsApiSpy = spyOn(apiJsonPlaceHolderServiceMock, 'getPosts').and.returnValue(of(mockPosts));
    const setPostServiceSpy = spyOn(postsService, 'setPosts');

    component.fetchPosts();
    expect(getPostsApiSpy).toHaveBeenCalled();
    expect(setPostServiceSpy).toHaveBeenCalledWith(mockPosts);
    expect(component.postSubscription).toBeDefined();
    expect(component.errorMessage).not.toBeDefined();

    getPostsApiSpy.and.returnValue(throwError({code: 500}));
    component.fetchPosts();
    expect(component.errorMessage).toBeDefined();
  });

  it('should get posts from post service', () => {
    const getPostServiceSpy = spyOn(postsService, 'getPosts').and.callThrough();
    component.getPosts$();
    expect(getPostServiceSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from get posts subscriptions on component destroy', () => {
    component.postSubscription = new Subscription();
    component.ngOnDestroy();
    expect(component.postSubscription.closed).toBeTruthy();
  });
});
