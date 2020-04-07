import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DashboardModule } from '../../dashboard/dashboard.module';
import { SharedService } from '../../dashboard/services/shared/shared.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: DashboardModule
})
export class SonarQubeService {

  private URL_PREFIX = environment.URL_PREFIX;
  private AUTH_TOKEN = environment.AUTH_TOKEN;

  private getApiOptions() {
    return {
      headers: {
        Authorization: 'Basic ' + this.AUTH_TOKEN
      },
      params: null,
      withCredentials: true
    };
  }

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
    this.searchMetrics().subscribe((data: any) => {
      this.sharedService.saveMetrics(data.metrics);
    });
  }

  searchProjects() {
    return this.http.get(this.URL_PREFIX + '/projects/search', this.getApiOptions());
  }

  searchMetrics() {
    const options = this.getApiOptions();
    options.params = {
      ps: 500
    };
    return this.http.get(this.URL_PREFIX + '/metrics/search', options);
  }

  getComponentMeasures(component: string, metricKeys: string[], additionalFields: string[]) {
    const options = this.getApiOptions();
    options.params = {
      component,
      metricKeys: metricKeys.join(','),
      additionalFields: additionalFields.join(',')
    };
    return this.http.get(this.URL_PREFIX + '/measures/component', options);
  }

  getComponentMeasuresHistory(component: string, metricKeys: string[]) {
    const options = this.getApiOptions();
    options.params = {
      component,
      metrics: metricKeys.join(',')
    };
    return this.http.get(this.URL_PREFIX + '/measures/search_history', options);
  }

  searchIssues(componentKeys: string[], facets: string[], customAttributes?: any) {
    const options = this.getApiOptions();
    options.params = {
      componentKeys: componentKeys.join(','),
      facets: facets.join(',')
    };
    Object.assign(options.params, customAttributes);
    return this.http.get(this.URL_PREFIX + '/issues/search', options);
  }

}
