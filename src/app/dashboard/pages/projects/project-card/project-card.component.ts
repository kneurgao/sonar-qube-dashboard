import { Component, Input } from '@angular/core';

import { ProjectComponent } from '../../../../services/sonar-qube/models/project-component.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tpl-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  @Input() projectComponent: ProjectComponent;
  page: string;
  passed: boolean;

  constructor(public activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      if (params.page) {
        this.page = params.page;
      }
    });
  }

  setStatus(passed: boolean) {
    this.passed = passed;
  }

}
