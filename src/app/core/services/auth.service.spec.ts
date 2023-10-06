import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';

import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  const storeServiceSpy = jasmine.createSpyObj('LocalStorageService', [
    'removeItem',
    'getItem',
  ]);
  let apolloTestingController: ApolloTestingController;
  const routerSpy = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [
        AuthService,
        { provide: LocalStorageService, useValue: storeServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    service = TestBed.inject(AuthService);
    apolloTestingController = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    apolloTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
