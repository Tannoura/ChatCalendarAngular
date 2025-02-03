import { TestBed } from '@angular/core/testing';

import { NotificationWebSocketService } from './notification-web-socket.service';

describe('NotificationWebSocketService', () => {
  let service: NotificationWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
