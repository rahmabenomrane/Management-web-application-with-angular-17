import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigMfComponent } from './config-mf.component';

describe('ConfigMfComponent', () => {
  let component: ConfigMfComponent;
  let fixture: ComponentFixture<ConfigMfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigMfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigMfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
