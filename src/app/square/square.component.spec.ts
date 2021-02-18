import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SquareComponent} from './square.component';
import {Post} from '../models/post.model';
import {PostProp} from '../models/post-prop.enumeration';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SquareComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
    component.post = new Post().createPostFromJson({userId: 1, id: 2, body: 'Hello world', title: 'Hello'});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle display number on init', () => {
    const setDisplayNumSpy = spyOn(component, 'toggleDisplayNum');
    component.ngOnInit();
    expect(setDisplayNumSpy).toHaveBeenCalled();
    expect(component.postProp).toBe(PostProp.id);
    expect(component.displayNum).toBe(2);
  });

  it('should toggle display number based on toggle', () => {
    component.postProp = PostProp.id;
    component.displayNum = 2;
    component.toggleDisplayNum();
    expect(component.displayNum).toBe(1);
    component.toggleDisplayNum();
    expect(component.displayNum).toBe(2);
  });
});
