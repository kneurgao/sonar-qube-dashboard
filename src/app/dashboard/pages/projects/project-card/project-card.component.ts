import { Component, Input } from '@angular/core';

import { ProjectComponent } from '../../../services/tpl-sonar-qube/models/project-component.model';

@Component({
  selector: 'tpl-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  @Input() projectComponent: ProjectComponent;
  passed: boolean;

  constructor() { }

  setStatus(passed: boolean) {
    this.passed = passed;
  }

}
