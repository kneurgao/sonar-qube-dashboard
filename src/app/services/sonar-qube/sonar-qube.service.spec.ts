import { TestBed } from '@angular/core/testing';

import { SonarQubeService } from './sonar-qube.service';

describe('SonarQubeService', () => {
  let service: SonarQubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SonarQubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
