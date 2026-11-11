import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppCard } from './card';

describe('AppCard', () => {
  let component: AppCard;
  let fixture: ComponentFixture<AppCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCard],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
