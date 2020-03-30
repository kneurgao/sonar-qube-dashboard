import { Component, OnInit, Input } from '@angular/core';

import { ProjectComponent } from '../../../services/tpl-sonar-qube/models/project-component.model';
import { TplSonarQubeService } from '../../../services/tpl-sonar-qube/tpl-sonar-qube.service';
import { TplSonarQubeHelper } from 'src/app/dashboard/services/tpl-sonar-qube/tpl-sonar-qube.helper';
import { ProjectMeasures } from '../../../services/tpl-sonar-qube/models/project-measures.model';
import { ProjectTrend } from 'src/app/dashboard/services/tpl-sonar-qube/models/project-trend.model';

@Component({
  selector: 'tpl-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() projectComponent: ProjectComponent;
  projectMeasures: ProjectMeasures;
  projectTrends: ProjectTrend[];

  constructor(private tplSonarQubeService: TplSonarQubeService,
              private tplSonarQubeHelper: TplSonarQubeHelper) { }

  ngOnInit(): void {
    this.fetchProjectMeasures();
    this.fetchProjectMeasuresHistory();
  }

  fetchProjectMeasures() {
    const metricKeys = [
      'complexity',
      'alert_status',
      'bugs',
      'reliability_rating',
      'vulnerabilities',
      'security_rating',
      'code_smells',
      'duplicated_lines_density',
      'sqale_rating'
    ];
    const additionalFields = [
      'metrics'
    ];
    this.tplSonarQubeService.getComponentMeasures(this.projectComponent.key, metricKeys, additionalFields)
    .subscribe((componentMeasures: any) => {
      this.projectMeasures = this.tplSonarQubeHelper.parseComponentMeasures(componentMeasures);
    });
  }

  fetchProjectMeasuresHistory() {
    const metricKeys = [
      'complexity',
      'bugs',
      'vulnerabilities',
      'code_smells',
      'duplicated_lines_density'
    ];
    this.tplSonarQubeService.getComponentMeasuresHistory(this.projectComponent.key, metricKeys)
    .subscribe((componentMeasuresHistory: any) => {
      this.projectTrends = this.tplSonarQubeHelper.parseComponentMeasuresHistory(componentMeasuresHistory);
    });
  }
}
