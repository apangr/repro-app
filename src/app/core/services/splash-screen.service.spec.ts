import { TestBed } from '@angular/core/testing';

import { SplashScreenService } from './splash-screen.service';

xdescribe('SplashScreenService', () => {
  let service: SplashScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplashScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
