import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetstrutedRecapComponent } from './getstruted-recap.component';

describe('GetstrutedRecapComponent', () => {
  let component: GetstrutedRecapComponent;
  let fixture: ComponentFixture<GetstrutedRecapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetstrutedRecapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetstrutedRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
