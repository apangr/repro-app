import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';

import { ProfileComponent } from './profile.component';
import { ProfileSettingsComponent } from '@app/views/+profile-settings/components/profile-settings/profile-settings.component';

xdescribe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const routes = [
    { path: 'settings', component: ProfileSettingsComponent },
  ] as Routes;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [TranslateService, TranslateStore],
      imports: [
        FontAwesomeModule,
        TranslateModule.forRoot(),
        RouterTestingModule.withRoutes(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
