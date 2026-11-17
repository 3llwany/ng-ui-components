import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppCheckbox } from './checkbox';

describe('AppCheckbox', () => {
  let component: AppCheckbox;
  let fixture: ComponentFixture<AppCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCheckbox],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCheckbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
