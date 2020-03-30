import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { ProjectMeasures } from '../../../../services/tpl-sonar-qube/models/project-measures.model';
import { TplSonarQubeService } from '../../../../services/tpl-sonar-qube/tpl-sonar-qube.service';
import { TplSonarQubeHelper } from '../../../../services/tpl-sonar-qube/tpl-sonar-qube.helper';

@Component({
  selector: 'tpl-project-measures',
  templateUrl: './project-measures.component.html',
  styleUrls: ['./project-measures.component.scss']
})
export class ProjectMeasuresComponent implements OnInit {

  @Input() projectKey: string;
  @Output() statusChanged = new EventEmitter<boolean>();
  projectMeasures: ProjectMeasures;

  constructor(private tplSonarQubeService: TplSonarQubeService,
              private tplSonarQubeHelper: TplSonarQubeHelper) { }

  ngOnInit(): void {
    this.fetchProjectMeasures();
  }

  fetchProjectMeasures() {
    const metricKeys = [
      'alert_status',
      'bugs',
      'reliability_rating',
      'vulnerabilities',
      'security_rating',
      'code_smells',
      'sqale_rating',
      'duplicated_lines_density'
    ];
    const additionalFields = [
      'metrics'
    ];
    this.tplSonarQubeService.getComponentMeasures(this.projectKey, metricKeys, additionalFields)
    .subscribe((componentMeasures: any) => {
      this.projectMeasures = this.tplSonarQubeHelper.parseComponentMeasures(componentMeasures);
      this.statusChanged.emit(this.projectMeasures.passed);
    });
  }

}
