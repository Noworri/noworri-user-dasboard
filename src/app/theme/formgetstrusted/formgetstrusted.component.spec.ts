import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormgetstrustedComponent } from './formgetstrusted.component';

describe('FormgetstrustedComponent', () => {
  let component: FormgetstrustedComponent;
  let fixture: ComponentFixture<FormgetstrustedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormgetstrustedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormgetstrustedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
