import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { AppConfirmDialog, ConfirmService } from './confirm';

describe('AppConfirmDialog and ConfirmService', () => {
  let fixture: ComponentFixture<AppConfirmDialog>;
  let component: AppConfirmDialog;
  let service: ConfirmService;
  let confirmationService: ConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppConfirmDialog],
      providers: [ConfirmService, ConfirmationService],
    });

    fixture = TestBed.createComponent(AppConfirmDialog);
    component = fixture.componentInstance;
    service = TestBed.inject(ConfirmService);
    confirmationService = TestBed.inject(ConfirmationService);
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('resolves true when accept is triggered', async () => {
    let capturedConfirmation: Confirmation | undefined;
    confirmationService.confirm = (conf) => {
      capturedConfirmation = conf;
      return confirmationService;
    };

    const promise = service.confirm({ message: 'Are you sure?' });
    await new Promise((r) => setTimeout(r, 0));

    expect(capturedConfirmation).toBeDefined();

    capturedConfirmation?.accept?.();
    const result = await promise;

    expect(result).toBe(true);
  });

  it('resolves false when reject is triggered', async () => {
    let capturedConfirmation: Confirmation | undefined;
    confirmationService.confirm = (conf) => {
      capturedConfirmation = conf;
      return confirmationService;
    };

    const promise = service.confirm({ message: 'Are you sure?' });
    await new Promise((r) => setTimeout(r, 0));

    expect(capturedConfirmation).toBeDefined();

    capturedConfirmation?.reject?.();
    const result = await promise;

    expect(result).toBe(false);
  });

  it('configures danger delete confirmation automatically', async () => {
    let capturedConfirmation: Confirmation | undefined;
    confirmationService.confirm = (conf) => {
      capturedConfirmation = conf;
      return confirmationService;
    };

    void service.delete('Student');
    await new Promise((r) => setTimeout(r, 0));

    expect(capturedConfirmation?.acceptButtonProps?.severity).toBe('danger');
    expect(capturedConfirmation?.icon).toBe('pi pi-trash');
  });
});
