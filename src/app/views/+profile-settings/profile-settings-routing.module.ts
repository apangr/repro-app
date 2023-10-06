import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HelpSupportComponent } from './pages/help-support/help-support.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileSettingsComponent,
    children: [
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        data: {
          title: 'Edit profile',
        },
      },
      {
        path: '',
        redirectTo: 'edit-profile',
        pathMatch: 'full',
      },
      {
        path: 'help-and-support',
        component: HelpSupportComponent,
        data: {
          title: 'Help & Support',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileSettingsRoutingModule {}
