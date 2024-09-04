import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionStatutComponent } from './gestion-statut.component';

describe('GestionStatutComponent', () => {
  let component: GestionStatutComponent;
  let fixture: ComponentFixture<GestionStatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionStatutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
