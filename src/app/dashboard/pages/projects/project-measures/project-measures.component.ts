import { Component, OnInit, Input } from '@angular/core';
import { faBug, faUnlock, faRadiationAlt, faClone, IconDefinition } from '@fortawesome/free-solid-svg-icons';

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
  passed: boolean;
  projectMetricMeasures: {
    name: string,
    value: string,
    rating: string,
    icon: IconDefinition
  }[] = [];

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
    .subscribe(this.parseProjectMeasures.bind(this));
  }

  parseProjectMeasures(projectMeasures: ProjectMeasures) {
    const alertStatusMeasure = this.getMeasure(projectMeasures, 'alert_status');
    this.passed = alertStatusMeasure.value === 'OK';

    this.parseProjectMeasure(projectMeasures, 'bugs', 'reliability_rating', faBug);
    this.parseProjectMeasure(projectMeasures, 'vulnerabilities', 'security_rating', faUnlock);
    this.parseProjectMeasure(projectMeasures, 'code_smells', 'sqale_rating', faRadiationAlt);
    this.parseProjectMeasure(projectMeasures, 'duplicated_lines_density', 'duplicated_lines_density', faClone);
  }

  private parseProjectMeasure(
    projectMeasures: ProjectMeasures,
    measureKey: string,
    ratingMeasureKey: string,
    icon: IconDefinition) {
    const metric = this.getMetric(projectMeasures, measureKey);
    const measure = this.getMeasure(projectMeasures, measureKey);

    const projectMetricMeasure = {
      name: metric.name,
      value: measure.value,
      rating: null,
      icon
    };

    const ratingMeasure = this.getMeasure(projectMeasures, ratingMeasureKey);
    projectMetricMeasure.rating = ratingMeasureKey === 'duplicated_lines_density' ?
      this.getDuplicationsRating(ratingMeasure.value) : this.getRating(ratingMeasure.value);

    this.projectMetricMeasures.push(projectMetricMeasure);
  }

  getMeasure(projectMeasures: ProjectMeasures, key: string): Measure {
    return projectMeasures.component.measures.find(measure => measure.metric === key);
  }

  getMetric(projectMeasures: ProjectMeasures, key: string): Metric {
    return projectMeasures.metrics.find(metric => metric.key === key);
  }

  getRating(value: string) {
    const rating = parseInt(value, 10);
    switch (rating) {
      case 1: return 'a';
      case 2: return 'b';
      case 3: return 'c';
      case 4: return 'd';
      case 5: return 'e';
      default: return '';
    }
  }

  getDuplicationsRating(value: string): string {
    const duplicatedLinesDensity = parseFloat(value);
    if (duplicatedLinesDensity > 20) {
      return 'e';
    } else if (duplicatedLinesDensity > 10) {
      return 'd';
    } else if (duplicatedLinesDensity > 5) {
      return 'c';
    } else if (duplicatedLinesDensity >= 3) {
      return 'b';
    }
    return 'a';
  }
}
