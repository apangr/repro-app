import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsMenuComponent } from './profile-settings-menu.component';

describe('ProfileSettingsMenuComponent', () => {
  let component: ProfileSettingsMenuComponent;
  let fixture: ComponentFixture<ProfileSettingsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSettingsMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSettingsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
