import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratAcheteurComponent } from './contrat-acheteur.component';

describe('ContratAcheteurComponent', () => {
  let component: ContratAcheteurComponent;
  let fixture: ComponentFixture<ContratAcheteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratAcheteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratAcheteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
