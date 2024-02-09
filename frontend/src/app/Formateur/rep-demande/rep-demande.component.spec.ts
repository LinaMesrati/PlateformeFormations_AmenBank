import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepDemandeComponent } from './rep-demande.component';

describe('RepDemandeComponent', () => {
  let component: RepDemandeComponent;
  let fixture: ComponentFixture<RepDemandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepDemandeComponent]
    });
    fixture = TestBed.createComponent(RepDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
