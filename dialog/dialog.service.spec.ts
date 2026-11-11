import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  DialogService as PrimeDialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { DialogService } from './dialog.service';

@Component({
  template: `<p></p>`,
})
class DummyModalComponent {}

describe('DialogService', () => {
  let service: DialogService;
  let primeDialog: PrimeDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService, PrimeDialogService],
    });
    service = TestBed.inject(DialogService);
    primeDialog = TestBed.inject(PrimeDialogService);
  });

  it('delegates open() to PrimeDialogService with defaults', async () => {
    let capturedComponent: unknown;
    let capturedConfig: DynamicDialogConfig | undefined;

    const mockRef = new DynamicDialogRef();
    primeDialog.open = (comp, config) => {
      capturedComponent = comp;
      capturedConfig = config;
      return mockRef;
    };

    const ref = await service.open(DummyModalComponent, {
      header: 'Edit Profile',
      data: { userId: '123' },
    });

    expect(ref).toBe(mockRef);
    expect(capturedComponent).toBe(DummyModalComponent);
    expect(capturedConfig?.header).toBe('Edit Profile');
    expect(capturedConfig?.modal).toBe(true);
    expect(capturedConfig?.data).toEqual({ userId: '123' });
  });

  it('resolves onClose value via openAsync()', async () => {
    const mockRef = new DynamicDialogRef();
    const closeSubject = new Subject<{ saved: boolean }>();
    mockRef.onClose = closeSubject.asObservable();

    primeDialog.open = () => mockRef;

    const promise = service.openAsync(DummyModalComponent);
    setTimeout(() => {
      closeSubject.next({ saved: true });
      closeSubject.complete();
    }, 0);

    const result = await promise;
    expect(result).toEqual({ saved: true });
  });
});
