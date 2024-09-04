import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseComponent } from './adresse.component';

describe('AdresseComponent', () => {
  let component: AdresseComponent;
  let fixture: ComponentFixture<AdresseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdresseComponent]
    });
    fixture = TestBed.createComponent(AdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
