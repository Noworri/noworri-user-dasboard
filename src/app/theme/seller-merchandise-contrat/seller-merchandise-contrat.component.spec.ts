import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerMerchandiseContratComponent } from './seller-merchandise-contrat.component';

describe('SellerMerchandiseContratComponent', () => {
  let component: SellerMerchandiseContratComponent;
  let fixture: ComponentFixture<SellerMerchandiseContratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerMerchandiseContratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerMerchandiseContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
