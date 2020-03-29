import { Injectable } from '@angular/core';
import { faBug, faUnlock, faRadiationAlt, faClone, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { DashboardModule } from '../../dashboard.module';
import { ProjectMeasures } from './models/project-measures.model';
import { Measure } from './models/measure.model';

@Injectable({
  providedIn: DashboardModule
})
export class TplSonarQubeHelper {

  constructor() { }

  parseComponentMeasures(componentMeasures: any) {
    const projectMeasures = new ProjectMeasures();

    const alertStatusMeasure = this.getMeasure(componentMeasures, 'alert_status');
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
    const measure = this.getMeasure(componentMeasures, measureKey);
    const metric = this.getMetric(componentMeasures, measureKey);

    const ratingMeasure = this.getMeasure(componentMeasures, ratingMeasureKey);
    const rating = ratingMeasureKey === 'duplicated_lines_density' ?
      this.getDuplicationsRating(ratingMeasure.value) : this.getRating(ratingMeasure.value);

    return new Measure(metric.name, measure.value, rating, icon);
  }

  getMeasure(componentMeasures: any, key: string) {
    return componentMeasures.component.measures.find(measure => measure.metric === key);
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

}
