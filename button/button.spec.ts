import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppButton } from './button';

describe('AppButton', () => {
  let component: AppButton;
  let fixture: ComponentFixture<AppButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppButton],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppButton);
    fixture.componentRef.setInput('label', 'common.actions.submit');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


