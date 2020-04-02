import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { faBug, faUnlockAlt, faRadiationAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faClone } from '@fortawesome/free-regular-svg-icons';

import { DashboardModule } from '../../dashboard.module';
import { SharedService } from '../shared/shared.service';
import { ProjectMeasures } from './models/project-measures.model';
import { Measure } from './models/measure.model';
import { ProjectTrends } from './models/project-trends.model';
import { Trend } from './models/trend.model';
import { IssueAssignees } from './models/issue-assignees.model';
import { Utils } from '../../../commons/utils';

@Injectable({
  providedIn: DashboardModule
})
export class TplSonarQubeHelper {

  constructor(private sharedService: SharedService,
              private datePipe: DatePipe) { }

  parseComponentMeasures(componentMeasures: any) {
    const projectMeasures = new ProjectMeasures();

    const alertStatusMeasure = this.getMeasure(componentMeasures.component, 'alert_status');
    projectMeasures.passed = alertStatusMeasure.value === 'OK';

    projectMeasures.measures.push(
      this.parseProjectMeasure(componentMeasures, 'bugs', 'reliability_rating', faBug)
    );
    projectMeasures.measures.push(
      this.parseProjectMeasure(componentMeasures, 'vulnerabilities', 'security_rating', faUnlockAlt)
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
    const projectTrend = new ProjectTrends();

    projectTrend.dates = componentMeasuresHistory.measures[0].history.map(historyItem => {
      return this.datePipe.transform(historyItem.date, 'dd-MMM-yy');
    });

    projectTrend.trends.push(
      this.parseProjectMeasureHistory(componentMeasuresHistory, 'bugs', faBug)
    );
    projectTrend.trends.push(
      this.parseProjectMeasureHistory(componentMeasuresHistory, 'vulnerabilities', faUnlockAlt)
    );
    projectTrend.trends.push(
      this.parseProjectMeasureHistory(componentMeasuresHistory, 'code_smells', faRadiationAlt)
    );
    projectTrend.trends.push(
      this.parseProjectMeasureHistory(componentMeasuresHistory, 'duplicated_lines_density', faClone)
    );

    return projectTrend;
  }

  private parseProjectMeasureHistory(
    componentMeasuresHistory: any,
    metricKey: string,
    icon: IconDefinition) {
    const trend = new Trend();

    trend.name = this.sharedService.getMetric(metricKey);

    const measure = this.getMeasure(componentMeasuresHistory, metricKey);
    trend.values = measure.history.map(historyItem => {
      return parseInt(historyItem.value, 10);
    });

    return trend;
  }

  parseIssueAssignees(issueSearchResults: any) {
    const issueAssignees = new IssueAssignees();

    const allAssigneesFacet = issueSearchResults[0].facets.find(facet => facet.property === 'assignees');
    const assigneesFacet = issueSearchResults[1].facets.find(facet => facet.property === 'assignees');

    allAssigneesFacet.values.forEach(value1 => {
      if (value1.val) {
        issueAssignees.assignees.push(value1.val ? Utils.getNameFromEmail(value1.val) : 'Unassigned');
        issueAssignees.allIssues.push(value1.count);

        const fixedIssue = assigneesFacet.values.find(value2 => value2.val === value1.val);
        issueAssignees.fixedIssues.push(fixedIssue ? fixedIssue.count : 0);
      }
    });

    return issueAssignees;
  }

}
