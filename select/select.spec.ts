import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectApp } from './select';

describe('Select', () => {
  let component: SelectApp;
  let fixture: ComponentFixture<SelectApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectApp],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectApp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
