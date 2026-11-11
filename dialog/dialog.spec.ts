import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppDialog } from './dialog';

describe('AppDialog', () => {
  let component: AppDialog;
  let fixture: ComponentFixture<AppDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDialog],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
