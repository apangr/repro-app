import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { IntlTelInputDirective } from 'src/app/shared/directives/intl-tel-input.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';

import { EditProfileComponent } from './edit-profile.component';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let apolloTestingController: ApolloTestingController;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['doLogout']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApolloTestingModule, FontAwesomeModule, IntlTelInputDirective],
      declarations: [EditProfileComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        ModalService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileComponent);
    apolloTestingController = TestBed.inject(ApolloTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
