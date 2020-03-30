import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tpl-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  links = [
    { title: 'Measures', fragment: 'measures' },
    { title: 'Trend', fragment: 'trend' }
  ];

  constructor(public activatedRoute: ActivatedRoute) { }

}
