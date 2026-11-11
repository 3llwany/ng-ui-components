import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImgFallbackDirective } from './img-fallback.directive';

@Component({
  imports: [ImgFallbackDirective],
  template: `<img src="invalid-url.png" appImgFallback="assets/fallback.png" alt="Test image" />`,
})
class TestHostComponent {}

describe('ImgFallbackDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('replaces broken src with fallback image URL on error event', () => {
    const imgDe = fixture.debugElement.query(By.css('img'));
    const imgEl = imgDe.nativeElement as HTMLImageElement;

    imgDe.triggerEventHandler('error', { target: imgEl });

    expect(imgEl.src).toContain('assets/fallback.png');
  });
});

