import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SquareComponent} from './square.component';
import {Post} from '../models/post.model';

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

  it('should get post object keys and set display text on init', () => {
    const setDisplayTextSpy = spyOn(component, 'setDisplayText');
    component.ngOnInit();
    expect(component.postKeys).toBeDefined();
    expect(component.currentPostPropIndex).toBeDefined();
    expect(component.currentPostPropIndex).toBe(0);
    expect(setDisplayTextSpy).toHaveBeenCalled();
  });

  it('should set displayText to the currently selected post property', () => {
    component.ngOnInit();

    component.setDisplayText();

    expect(component.displayText).toBeDefined();
    expect(component.displayText).toBe(2);
  });

  it('should toggle display text based on post properties', () => {
    component.currentPostPropIndex = 2; // title
    const setDisplayTextSpy = spyOn(component, 'setDisplayText').and.callThrough();
    component.toggleDisplayText(); // emulates a click
    expect(setDisplayTextSpy).toHaveBeenCalled();
    expect(component.displayText).toBe('Hello world');

    // edge case
    component.currentPostPropIndex = 3;
    component.toggleDisplayText();
    expect(component.currentPostPropIndex).toBe(0);
  });

  it('should check if a value is a number', () => {
    expect(component.isNumber('123')).toBeTruthy();
    expect(component.isNumber(123)).toBeTruthy();
    expect(component.isNumber('xyz')).toBeFalsy();
  });

});
