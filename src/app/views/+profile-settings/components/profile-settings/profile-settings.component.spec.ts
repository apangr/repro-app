import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@app/core/services/auth.service';

import { ProfileSettingsComponent } from './profile-settings.component';

xdescribe('ProfileSettingsComponent', () => {
  let component: ProfileSettingsComponent;
  let fixture: ComponentFixture<ProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSettingsComponent],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
