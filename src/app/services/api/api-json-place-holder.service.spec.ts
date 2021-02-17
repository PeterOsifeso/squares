import {TestBed} from '@angular/core/testing';

import {ApiJsonPlaceHolderService} from './api-json-place-holder.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Post} from '../../models/post.model';
import {of, throwError} from 'rxjs';

let httpClientSpy: { get: jasmine.Spy };
let apiJsonPlaceHolderService: ApiJsonPlaceHolderService;
describe('ApiJsonPlaceHolderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useClass: HttpClientTestingModule}]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    apiJsonPlaceHolderService = new ApiJsonPlaceHolderService(httpClientSpy as any);
  });

  it('should be created', () => {
    const service: ApiJsonPlaceHolderService = TestBed.get(ApiJsonPlaceHolderService);
    expect(service).toBeTruthy();
  });

  it('should return posts from API', () => {
    const expectedPosts = [new Post().createPostFromJson({userId: 1, id: 2, body: 'Hello world', title: 'Hello'})];
    httpClientSpy.get.and.returnValue(of(expectedPosts));

    apiJsonPlaceHolderService.getPosts().subscribe(posts => {
      expect(posts).toEqual(expectedPosts);
    }, () => fail);

    httpClientSpy.get.and.returnValue(throwError({status: '500'}));

    apiJsonPlaceHolderService.getPosts().subscribe(
      () => fail,
      (error => expect(error.status).toBe('500'))
    );
  });
});
