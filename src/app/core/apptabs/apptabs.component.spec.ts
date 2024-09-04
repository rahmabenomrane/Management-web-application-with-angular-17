import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptabsComponent } from './apptabs.component';

describe('ApptabsComponent', () => {
  let component: ApptabsComponent;
  let fixture: ComponentFixture<ApptabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApptabsComponent]
    });
    fixture = TestBed.createComponent(ApptabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
