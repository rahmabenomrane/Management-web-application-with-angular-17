import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestutiComponent } from './gestuti.component';

describe('GestutiComponent', () => {
  let component: GestutiComponent;
  let fixture: ComponentFixture<GestutiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestutiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestutiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
