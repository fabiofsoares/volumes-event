import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEventPageComponent } from './display-event-page.component';

describe('DisplayEventPageComponent', () => {
  let component: DisplayEventPageComponent;
  let fixture: ComponentFixture<DisplayEventPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayEventPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
