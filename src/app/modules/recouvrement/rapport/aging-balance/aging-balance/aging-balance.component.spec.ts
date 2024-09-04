import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgingBalanceComponent } from './aging-balance.component';

describe('AgingBalanceComponent', () => {
  let component: AgingBalanceComponent;
  let fixture: ComponentFixture<AgingBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgingBalanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgingBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
