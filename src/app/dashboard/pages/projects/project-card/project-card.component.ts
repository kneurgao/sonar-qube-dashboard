import { Component, Input } from '@angular/core';

import { ProjectComponent } from '../../../services/tpl-sonar-qube/models/project-component.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tpl-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  @Input() projectComponent: ProjectComponent;
  activeFragment: string;
  passed: boolean;

  constructor(public activatedRoute: ActivatedRoute) {
    this.activatedRoute.fragment.subscribe((fragment: string) => {
      this.activeFragment = fragment;
    });
  }

  setStatus(passed: boolean) {
    this.passed = passed;
  }

}
