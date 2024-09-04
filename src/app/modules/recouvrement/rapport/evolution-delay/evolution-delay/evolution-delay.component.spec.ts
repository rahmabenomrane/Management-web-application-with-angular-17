import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionDelayComponent } from './evolution-delay.component';

describe('EvolutionDelayComponent', () => {
  let component: EvolutionDelayComponent;
  let fixture: ComponentFixture<EvolutionDelayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionDelayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvolutionDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
