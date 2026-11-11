import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppSelect } from './select';

describe('AppSelect', () => {
  let component: AppSelect<{ label: string; value: string }>;
  let fixture: ComponentFixture<AppSelect<{ label: string; value: string }>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSelect],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSelect<{ label: string; value: string }>);
    fixture.componentRef.setInput('options', []);
    fixture.componentRef.setInput('optionLabel', 'label');
    fixture.componentRef.setInput('optionValue', 'value');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


