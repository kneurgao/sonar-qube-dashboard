import { TestBed } from '@angular/core/testing';

import { TplSonarQubeService } from './tpl-sonar-qube.service';

describe('TplSonarQubeService', () => {
  let service: TplSonarQubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TplSonarQubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
