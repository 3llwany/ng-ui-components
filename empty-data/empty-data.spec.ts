import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppEmptyData } from './empty-data';

describe('AppEmptyData', () => {
  let component: AppEmptyData;
  let fixture: ComponentFixture<AppEmptyData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppEmptyData],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppEmptyData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
