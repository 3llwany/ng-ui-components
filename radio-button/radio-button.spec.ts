import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppRadioButton } from './radio-button';

describe('AppRadioButton', () => {
  let component: AppRadioButton<string>;
  let fixture: ComponentFixture<AppRadioButton<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRadioButton],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppRadioButton<string>);
    fixture.componentRef.setInput('value', 'option-a');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
