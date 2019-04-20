import { TestBed } from '@angular/core/testing';

import { EventbriteService } from './eventbrite.service';

describe('EventbriteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventbriteService = TestBed.get(EventbriteService);
    expect(service).toBeTruthy();
  });
});
