import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tpl-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  routerUrl: string;

  menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard'
    },
    {
      title: 'Projects',
      path: '/dashboard/projects',
      children: [
        { title: 'Measures', path: 'measures' },
        { title: 'Trend', path: 'trend' },
        { title: 'Assignees', path: 'assignees' }
      ]
    }
  ];

  constructor(private router: Router) {
    this.routerUrl = this.router.url;
  }

}
