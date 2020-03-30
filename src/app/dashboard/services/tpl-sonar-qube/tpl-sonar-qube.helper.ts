import { Injectable } from '@angular/core';
import { faBug, faUnlock, faRadiationAlt, faClone, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { DashboardModule } from '../../dashboard.module';
import { SharedService } from '../shared/shared.service';
import { ProjectMeasures } from './models/project-measures.model';
import { Measure } from './models/measure.model';
import { ProjectTrend } from './models/project-trend.model';

@Injectable({
  providedIn: DashboardModule
})
export class TplSonarQubeHelper {

  constructor(private sharedService: SharedService) { }

  parseComponentMeasures(componentMeasures: any) {
    const projectMeasures = new ProjectMeasures();

    const alertStatusMeasure = this.getMeasure(componentMeasures.component, 'alert_status');
    projectMeasures.passed = alertStatusMeasure.value === 'OK';

    projectMeasures.measures.push(
      this.parseProjectMeasure(componentMeasures, 'bugs', 'reliability_rating', faBug)
    );
    projectMeasures.measures.push(
      this.parseProjectMeasure(componentMeasures, 'vulnerabilities', 'security_rating', faUnlock)
    );
    projectMeasures.measures.push(
      this.parseProjectMeasure(componentMeasures, 'code_smells', 'sqale_rating', faRadiationAlt)
    );
    projectMeasures.measures.push(
      this.parseProjectMeasure(componentMeasures, 'duplicated_lines_density', 'duplicated_lines_density', faClone)
    );

    return projectMeasures;
  }

  private parseProjectMeasure(
    componentMeasures: any,
    measureKey: string,
    ratingMeasureKey: string,
    icon: IconDefinition) {
    const measure = this.getMeasure(componentMeasures.component, measureKey);
    const metric = this.getMetric(componentMeasures, measureKey);

    const ratingMeasure = this.getMeasure(componentMeasures.component, ratingMeasureKey);
    const rating = ratingMeasureKey === 'duplicated_lines_density' ?
      this.getDuplicationsRating(ratingMeasure.value) : this.getRating(ratingMeasure.value);

    return new Measure(metric.name, measure.value, rating, icon);
  }

  getMeasure(component: any, key: string) {
    return component.measures.find(measure => measure.metric === key);
  }

  getMetric(componentMeasures: any, key: string) {
    return componentMeasures.metrics.find(metric => metric.key === key);
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

  parseComponentMeasuresHistory(componentMeasuresHistory: any) {
    const projectTrends = [];

    projectTrends.push(
      this.parseProjectMeasureHistory(componentMeasuresHistory, 'bugs', faBug)
    );
    projectTrends.push(
      this.parseProjectMeasureHistory(componentMeasuresHistory, 'vulnerabilities', faUnlock)
    );
    projectTrends.push(
      this.parseProjectMeasureHistory(componentMeasuresHistory, 'code_smells', faRadiationAlt)
    );
    projectTrends.push(
      this.parseProjectMeasureHistory(componentMeasuresHistory, 'duplicated_lines_density', faClone)
    );

    return projectTrends;
  }

  private parseProjectMeasureHistory(
    componentMeasuresHistory: any,
    metricKey: string,
    icon: IconDefinition) {
    const projectTrend = new ProjectTrend();

    projectTrend.metric = this.sharedService.getMetric(metricKey);
    projectTrend.values = this.getMeasure(componentMeasuresHistory, metricKey).history;

    return projectTrend;
  }

}
