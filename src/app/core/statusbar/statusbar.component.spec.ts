import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StatusBarComponent } from './statusbar.component';

describe('StatusBarComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [StatusBarComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(StatusBarComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'public'`, () => {
    const fixture = TestBed.createComponent(StatusBarComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('public');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(StatusBarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('public app is running!');
  });
});
