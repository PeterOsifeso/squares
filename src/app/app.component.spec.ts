import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApiJsonPlaceHolderService} from './services/api/api-json-place-holder.service';
import {ApiJsonPlaceHolderServiceMock} from './tests/mock/ApiJsonPlaceHolderServiceMock';
import {Subscription, throwError} from 'rxjs';

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: ApiJsonPlaceHolderService, useClass: ApiJsonPlaceHolderServiceMock}
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
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
    const getPostsSpy = spyOn(apiJsonPlaceHolderServiceMock, 'getPosts').and.callThrough();
    component.fetchPosts();
    expect(getPostsSpy).toHaveBeenCalled();
    expect(component.postSubscription).toBeDefined();
    expect(component.posts).toBeDefined();
    expect(component.posts.length).toBe(1);
    expect(component.errorMessage).not.toBeDefined();

    getPostsSpy.and.returnValue(throwError({code: 500}));
    component.fetchPosts();
    expect(component.errorMessage).toBeDefined();
  });

  it('should unsubscribe from get posts subscriptions on component destroy', () => {
    component.postSubscription = new Subscription();
    component.ngOnDestroy();
    expect(component.postSubscription.closed).toBeTruthy();
  });
});
