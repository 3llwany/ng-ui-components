import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { AppTable } from './table';

describe('AppTable', () => {
  let component: AppTable<{ id: number; name: string }>;
  let fixture: ComponentFixture<AppTable<{ id: number; name: string }>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTable],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTable<{ id: number; name: string }>);
    fixture.componentRef.setInput('columns', [{ header: 'NAME', prop: 'name' }]);
    fixture.componentRef.setInput('list', [{ id: 1, name: 'Test' }]);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
