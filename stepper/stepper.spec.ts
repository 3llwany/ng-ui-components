import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppStepper } from './stepper';

describe('AppStepper', () => {
  let component: AppStepper;
  let fixture: ComponentFixture<AppStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStepper],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppStepper);
    fixture.componentRef.setInput('steps', [{ label: 'STEP_1' }, { label: 'STEP_2' }]);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
