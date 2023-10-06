import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '@app/core/guards/is-authenticated.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      title: 'asd',
    },
    children: [
      {
        path: 'notifications',
        loadChildren: () =>
          import('../+notifications/notifications.module').then(
            (m) => m.NotificationsModule
          ),
        canActivate: [IsAuthenticatedGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
