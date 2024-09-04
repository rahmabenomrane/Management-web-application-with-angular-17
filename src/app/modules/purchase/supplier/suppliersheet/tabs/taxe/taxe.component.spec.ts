import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxeComponent } from './taxe.component';

describe('TaxeComponent', () => {
  let component: TaxeComponent;
  let fixture: ComponentFixture<TaxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
