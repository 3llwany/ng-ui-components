import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppDatepicker } from './datepicker';

describe('AppDatepicker', () => {
  let component: AppDatepicker;
  let fixture: ComponentFixture<AppDatepicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDatepicker],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppDatepicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


