import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '@app/core/guards/is-authenticated.guard';
import { Shell } from '@app/views/+shell/services/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      loadChildren: () =>
        import('./views/+shell/shell.module').then((m) => m.ShellModule),
      canActivate: [IsAuthenticatedGuard],
    },
    {
      path: 'profile',
      loadChildren: () =>
        import('./views/+profile/profile.module').then((m) => m.ProfileModule),
    },
    {
      path: 'settings',
      loadChildren: () =>
        import('./views/+profile-settings/profile-settings.module').then(
          (m) => m.ProfileSettingsModule
        ),
      canActivate: [IsAuthenticatedGuard],
    },
  ]),
  {
    path: 'error',
    loadChildren: () =>
      import('./views/+errors/errors.module').then((m) => m.ErrorsModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
