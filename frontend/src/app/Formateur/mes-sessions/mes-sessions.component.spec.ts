import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesSessionsComponent } from './mes-sessions.component';

describe('MesSessionsComponent', () => {
  let component: MesSessionsComponent;
  let fixture: ComponentFixture<MesSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesSessionsComponent]
    });
    fixture = TestBed.createComponent(MesSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
