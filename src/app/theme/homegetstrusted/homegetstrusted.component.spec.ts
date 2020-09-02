import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomegetstrustedComponent } from './homegetstrusted.component';

describe('HomegetstrustedComponent', () => {
  let component: HomegetstrustedComponent;
  let fixture: ComponentFixture<HomegetstrustedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomegetstrustedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomegetstrustedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
