import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeConfigurationComponent } from './type-configuration.component';

describe('TypeConfigurationComponent', () => {
  let component: TypeConfigurationComponent;
  let fixture: ComponentFixture<TypeConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeConfigurationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
