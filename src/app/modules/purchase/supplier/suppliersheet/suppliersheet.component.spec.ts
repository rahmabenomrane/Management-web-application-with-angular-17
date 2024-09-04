import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersheetComponent } from './suppliersheet.component';

describe('SuppliersheetComponent', () => {
  let component: SuppliersheetComponent;
  let fixture: ComponentFixture<SuppliersheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuppliersheetComponent]
    });
    fixture = TestBed.createComponent(SuppliersheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
