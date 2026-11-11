import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { BackBtn } from './back-btn';

describe('BackBtn', () => {
  let component: BackBtn;
  let fixture: ComponentFixture<BackBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackBtn],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(BackBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
