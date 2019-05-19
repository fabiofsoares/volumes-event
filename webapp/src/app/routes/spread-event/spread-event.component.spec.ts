import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadEventComponent } from './spread-event.component';

describe('SpreadEventComponent', () => {
  let component: SpreadEventComponent;
  let fixture: ComponentFixture<SpreadEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpreadEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
