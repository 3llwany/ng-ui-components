import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppTextarea } from './textarea';

describe('AppTextarea', () => {
  let component: AppTextarea;
  let fixture: ComponentFixture<AppTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTextarea],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTextarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
