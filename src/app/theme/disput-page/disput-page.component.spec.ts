import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputPageComponent } from './disput-page.component';

describe('DisputPageComponent', () => {
  let component: DisputPageComponent;
  let fixture: ComponentFixture<DisputPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
