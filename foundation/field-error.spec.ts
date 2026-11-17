import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppFieldError } from './field-error';

describe('AppFieldError', () => {
  let component: AppFieldError;
  let fixture: ComponentFixture<AppFieldError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFieldError],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFieldError);
    fixture.componentRef.setInput('errorId', 'email_error');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render alert when message is null', () => {
    const alertEl = (fixture.nativeElement as HTMLElement).querySelector('[role="alert"]');
    expect(alertEl).toBeNull();
  });

  it('should render accessible alert with errorId and message', async () => {
    fixture.componentRef.setInput('message', 'VALIDATION.REQUIRED');
    await fixture.whenStable();

    const alertEl = (fixture.nativeElement as HTMLElement).querySelector('[role="alert"]');
    expect(alertEl).not.toBeNull();
    expect(alertEl?.getAttribute('id')).toBe('email_error');
    expect(alertEl?.textContent).toContain('VALIDATION.REQUIRED');
  });
});
