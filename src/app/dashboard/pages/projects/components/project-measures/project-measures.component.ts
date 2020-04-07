import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { ProjectMeasures } from '../../../../../services/sonar-qube/models/project-measures.model';
import { SonarQubeService } from '../../../../../services/sonar-qube/sonar-qube.service';
import { SonarQubeHelper } from '../../../../../services/sonar-qube/sonar-qube.helper';

@Component({
  selector: 'tpl-project-measures',
  templateUrl: './project-measures.component.html',
  styleUrls: ['./project-measures.component.scss']
})
export class ProjectMeasuresComponent implements OnInit {

  @Input() projectKey: string;
  @Output() statusChanged = new EventEmitter<boolean>();
  projectMeasures: ProjectMeasures;

  constructor(private sonarQubeService: SonarQubeService,
              private sonarQubeHelper: SonarQubeHelper) { }

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
    this.sonarQubeService.getComponentMeasures(this.projectKey, metricKeys, additionalFields)
    .subscribe((componentMeasures: any) => {
      this.projectMeasures = this.sonarQubeHelper.parseComponentMeasures(componentMeasures);
      this.statusChanged.emit(this.projectMeasures.passed);
    });
  }

}
