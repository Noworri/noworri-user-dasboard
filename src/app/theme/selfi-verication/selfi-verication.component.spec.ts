import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfiVericationComponent } from './selfi-verication.component';

describe('SelfiVericationComponent', () => {
  let component: SelfiVericationComponent;
  let fixture: ComponentFixture<SelfiVericationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfiVericationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfiVericationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
