import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierMaintComponent } from './supplier-maint.component';

describe('SupplierMaintComponent', () => {
  let component: SupplierMaintComponent;
  let fixture: ComponentFixture<SupplierMaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierMaintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
