import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionRecoveryDelayComponent } from './evolution-recovery-delay.component';

describe('EvolutionRecoveryDelayComponent', () => {
  let component: EvolutionRecoveryDelayComponent;
  let fixture: ComponentFixture<EvolutionRecoveryDelayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionRecoveryDelayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvolutionRecoveryDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
