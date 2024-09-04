import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryForecastComponent } from './recovery-forecast.component';

describe('RecoveryForecastComponent', () => {
  let component: RecoveryForecastComponent;
  let fixture: ComponentFixture<RecoveryForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryForecastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecoveryForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
