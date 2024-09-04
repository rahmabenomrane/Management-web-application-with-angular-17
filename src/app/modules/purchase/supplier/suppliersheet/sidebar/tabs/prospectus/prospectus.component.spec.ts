import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectusComponent } from './prospectus.component';

describe('ProspectusComponent', () => {
  let component: ProspectusComponent;
  let fixture: ComponentFixture<ProspectusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProspectusComponent]
    });
    fixture = TestBed.createComponent(ProspectusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
