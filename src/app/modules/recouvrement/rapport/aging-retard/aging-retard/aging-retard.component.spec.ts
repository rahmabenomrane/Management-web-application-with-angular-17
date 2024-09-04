import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgingRetardComponent } from './aging-retard.component';

describe('AgingRetardComponent', () => {
  let component: AgingRetardComponent;
  let fixture: ComponentFixture<AgingRetardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgingRetardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgingRetardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
