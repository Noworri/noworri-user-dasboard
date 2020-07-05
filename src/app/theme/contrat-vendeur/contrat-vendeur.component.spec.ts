import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratVendeurComponent } from './contrat-vendeur.component';

describe('ContratVendeurComponent', () => {
  let component: ContratVendeurComponent;
  let fixture: ComponentFixture<ContratVendeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratVendeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
