import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessFooterComponent } from './process-footer.component';

describe('ProcessFooterComponent', () => {
  let component: ProcessFooterComponent;
  let fixture: ComponentFixture<ProcessFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
