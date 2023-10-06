import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error400Component } from './error-400/error-400.component';
import { Error500Component } from './error-500/error-500.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/not-found',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    component: Error400Component,
    data: {
      title: 'Page Not Found - Fanatyx',
    },
  },
  {
    path: 'server-error',
    component: Error500Component,
    data: {
      title: 'Server Error - Fanatyx',
    },
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorsRoutingModule {}
