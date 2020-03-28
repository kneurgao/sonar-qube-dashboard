import { Component, OnInit, Input } from '@angular/core';

import { ProjectComponent } from '../../../services/tpl-sonar-qube/models/project-component.model';
import { TplSonarQubeService } from '../../../services/tpl-sonar-qube/tpl-sonar-qube.service';
import { ProjectMeasures } from '../../../services/tpl-sonar-qube/models/project-measures.model';
import { Measure } from '../../../services/tpl-sonar-qube/models/measure.model';
import { Metric } from '../../../services/tpl-sonar-qube/models/metric.model';

@Component({
  selector: 'tpl-project-measures',
  templateUrl: './project-measures.component.html',
  styleUrls: ['./project-measures.component.scss']
})
export class ProjectMeasuresComponent implements OnInit {

  @Input() projectComponent: ProjectComponent;
  projectMeasures: ProjectMeasures;

  constructor(private tplSonarQubeService: TplSonarQubeService) { }

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
    .subscribe((projectMeasures: ProjectMeasures) => {
      this.projectMeasures = projectMeasures;
    });
  }

  getMeasure(key: string): Measure {
    return this.projectMeasures.component.measures.find(measure => measure.metric === key);
  }

  getMetric(key: string): Metric {
    return this.projectMeasures.metrics.find(metric => metric.key === key);
  }

  getRatingClass(key: string): string {
    return 'rating-' + parseInt(this.getMeasure(key).value, 10);
  }

  getDuplicationsRatingClass(): string {
    const duplicatedLinesDensity = parseFloat(this.getMeasure('duplicated_lines_density').value);
    let ratingClass = 'rating-';
    if (duplicatedLinesDensity > 20) {
      ratingClass += 5;
    } else if (duplicatedLinesDensity > 10) {
      ratingClass += 4;
    } else if (duplicatedLinesDensity > 5) {
      ratingClass += 3;
    } else if (duplicatedLinesDensity >= 3) {
      ratingClass += 2;
    } else {
      ratingClass += 1;
    }
    return ratingClass;
  }
}
