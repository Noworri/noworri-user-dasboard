import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerMerchandiseContratComponent } from './buyer-merchandise-contrat.component';

describe('BuyerMerchandiseContratComponent', () => {
  let component: BuyerMerchandiseContratComponent;
  let fixture: ComponentFixture<BuyerMerchandiseContratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerMerchandiseContratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerMerchandiseContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
