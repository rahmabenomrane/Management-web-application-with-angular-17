import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppBarComponent } from './appbar.component';

describe('AppBarComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppBarComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppBarComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'public'`, () => {
    const fixture = TestBed.createComponent(AppBarComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('public');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppBarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('public app is running!');
  });
});
