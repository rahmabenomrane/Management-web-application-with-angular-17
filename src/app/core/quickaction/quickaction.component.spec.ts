import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickActionComponent } from './quickaction.component';

describe('QuickActionComponent', () => {
  let component: QuickActionComponent;
  let fixture: ComponentFixture<QuickActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickActionComponent]
    });
    fixture = TestBed.createComponent(QuickActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
