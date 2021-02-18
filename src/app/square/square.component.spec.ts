import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SquareComponent} from './square.component';
import {Post} from '../models/post.model';

import {PostsService} from '../services/posts.service';
import {PostsServiceMock} from '../tests/mock/PostsServiceMock';
import {PostProp} from '../models/post-prop.enumeration';
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


  it('should fetch a particular post', () => {
    const getPostServiceSpy = spyOn(postsServiceMock, 'getPost').and.returnValue(of(mockPost));
    const toggleDisplayNumSpy = spyOn(component, 'toggleDisplayNum');
    component.index = 2;
    component.fetchPost();
    expect(component.postSubscription).toBeDefined();
    expect(getPostServiceSpy).toHaveBeenCalledWith(2);
    expect(JSON.stringify(component.post)).toBe(JSON.stringify(mockPost));
    expect(toggleDisplayNumSpy).toHaveBeenCalled();
  });

  it('should toggle display number based on toggle', () => {
    component.post = mockPost;
    component.postProp = PostProp.id;
    component.displayNum = 2;
    component.toggleDisplayNum();
    expect(component.displayNum).toBe(1);
    component.toggleDisplayNum();
    expect(component.displayNum).toBe(2);
  });

  it('should unsubscribe from post subscription on component destroy', () => {
    component.postSubscription = new Subscription();
    component.ngOnDestroy();
    expect(component.postSubscription.closed).toBeTruthy();
  });

});
