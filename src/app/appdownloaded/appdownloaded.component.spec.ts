import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppdownloadedComponent } from './appdownloaded.component';

describe('AppdownloadedComponent', () => {
  let component: AppdownloadedComponent;
  let fixture: ComponentFixture<AppdownloadedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppdownloadedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppdownloadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
