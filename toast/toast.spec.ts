import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { AppToast, ToastService } from './toast';

describe('AppToast and ToastService', () => {
  let fixture: ComponentFixture<AppToast>;
  let component: AppToast;
  let service: ToastService;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppToast],
      providers: [ToastService, MessageService],
    });

    fixture = TestBed.createComponent(AppToast);
    component = fixture.componentInstance;
    service = TestBed.inject(ToastService);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('delegates success toast to MessageService with translated fallback', async () => {
    let capturedMessage: unknown;
    messageService.add = (msg) => {
      capturedMessage = msg;
    };

    await service.show('success', 'Operation done', 'Success');

    expect(capturedMessage).toEqual(
      expect.objectContaining({
        severity: 'success',
        summary: 'Success',
        detail: 'Operation done',
      }),
    );
  });

  it('dispatches error toast with sticky mode enabled', async () => {
    let capturedMessage: unknown;
    messageService.add = (msg) => {
      capturedMessage = msg;
    };

    await service.error('Failed to load data');

    expect(capturedMessage).toEqual(
      expect.objectContaining({
        severity: 'error',
        detail: 'Failed to load data',
        sticky: true,
      }),
    );
  });
});
