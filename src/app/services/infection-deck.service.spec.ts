import { TestBed } from '@angular/core/testing';

import { InfectionDeckService } from './infection-deck.service';

describe('InfectionDeckService', () => {
  let service: InfectionDeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfectionDeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
