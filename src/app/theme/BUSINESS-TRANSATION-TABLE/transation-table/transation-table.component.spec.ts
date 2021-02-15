import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransationTableComponent } from './transation-table.component';

describe('TransationTableComponent', () => {
  let component: TransationTableComponent;
  let fixture: ComponentFixture<TransationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
