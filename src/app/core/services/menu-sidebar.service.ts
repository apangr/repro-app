import { Injectable } from '@angular/core';

@Injectable()
export class MenuSidebarService {
  reduceMenu() {
    const sideBarId = document.querySelector('#menuSidebar');
    const mainContent = document.getElementById('main-content-block');
    if (sideBarId) sideBarId.classList.add('compress-sidebar');
    if (mainContent) {
      mainContent.classList.add('collapse-menu');
      mainContent.classList.remove('expand-menu');
    }
  }
  expandMenu() {
    const sidenavId = document.querySelector('#menuSidebar');
    const mainContent = document.getElementById('main-content-block');
    sidenavId?.classList.remove('compress-sidebar');
    if (mainContent) {
      mainContent.classList.add('expand-menu');
      mainContent.classList.remove('collapse-menu');
    }
  }
}
