import { Component, OnInit, Input } from '@angular/core';

import { ProjectComponent } from '../../../services/tpl-sonar-qube/models/project-component.model';
import { TplSonarQubeService } from '../../../services/tpl-sonar-qube/tpl-sonar-qube.service';
import { TplSonarQubeHelper } from 'src/app/dashboard/services/tpl-sonar-qube/tpl-sonar-qube.helper';
import { ProjectMeasures } from '../../../services/tpl-sonar-qube/models/project-measures.model';

@Component({
  selector: 'tpl-project-measures',
  templateUrl: './project-measures.component.html',
  styleUrls: ['./project-measures.component.scss']
})
export class ProjectMeasuresComponent implements OnInit {

  @Input() projectComponent: ProjectComponent;
  projectMeasures: ProjectMeasures;

  constructor(private tplSonarQubeService: TplSonarQubeService,
              private tplSonarQubeHelper: TplSonarQubeHelper) { }

  ngOnInit(): void {
    this.fetchProjectMeasures();
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

}
