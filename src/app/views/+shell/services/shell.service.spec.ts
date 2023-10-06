import { TestBed } from '@angular/core/testing';

import { Shell } from './shell.service';

xdescribe('Shell', () => {
  let service: Shell;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Shell);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
