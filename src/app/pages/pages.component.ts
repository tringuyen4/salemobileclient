import { Component } from '@angular/core';
import { NetworkserviceService } from '../services/networkservice.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})

export class PagesComponent {
  constructor(private service: NetworkserviceService) {}

  menu = this.service.MENU_ITEMS;
}
