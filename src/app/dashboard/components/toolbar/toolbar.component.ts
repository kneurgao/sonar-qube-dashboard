import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tpl-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  links = [
    { title: 'Measures', fragment: 'measures' },
    { title: 'Trend', fragment: 'trend' },
    { title: 'Assignees', fragment: 'assignees' }
  ];

  constructor(public activatedRoute: ActivatedRoute) { }

}
