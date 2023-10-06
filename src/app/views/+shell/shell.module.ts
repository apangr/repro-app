import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './components/shell/shell.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ShellRoutingModule } from './shell-routing.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [ShellComponent, MenuSidebarComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    RouterModule,
    SharedModule,
    TranslateModule,
    MatBadgeModule,
    MatMenuModule,
  ],
})
export class ShellModule {}
