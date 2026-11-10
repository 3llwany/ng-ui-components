import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppBackBtn } from './back-btn';

describe('AppBackBtn', () => {
  let component: AppBackBtn;
  let fixture: ComponentFixture<AppBackBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppBackBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(AppBackBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

