import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierHistoryComponent } from './supplier-history.component';

describe('SupplierHistoryComponent', () => {
  let component: SupplierHistoryComponent;
  let fixture: ComponentFixture<SupplierHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
