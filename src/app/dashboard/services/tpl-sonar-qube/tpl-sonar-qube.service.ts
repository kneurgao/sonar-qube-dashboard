import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DashboardModule } from '../../dashboard.module';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: DashboardModule
})
export class TplSonarQubeService {

  private URL_PREFIX = 'http://114.143.20.82:9000/api';
  private AUTH_TOKEN = 'MWExYmY5ODlhMjE3M2EyZDI2MTQxYzgxNzg2NDRmZmI4MWUwZTJjZjo=';
  private API_OPTIONS = {
    headers: {
      Authorization: 'Basic ' + this.AUTH_TOKEN
    },
    params: null,
    withCredentials: true
  };

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
    this.searchMetrics().subscribe((data: any) => {
      this.sharedService.saveMetrics(data.metrics);
    });
  }

  searchProjects() {
    return this.http.get(this.URL_PREFIX + '/projects/search', this.API_OPTIONS);
  }

  searchMetrics() {
    this.API_OPTIONS.params = {
      ps: 500
    };
    return this.http.get(this.URL_PREFIX + '/metrics/search', this.API_OPTIONS);
  }

  getComponentMeasures(component: string, metricKeys: string[], additionalFields: string[]) {
    this.API_OPTIONS.params = {
      component,
      metricKeys: metricKeys.join(','),
      additionalFields: additionalFields.join(',')
    };
    return this.http.get(this.URL_PREFIX + '/measures/component', this.API_OPTIONS);
  }

  getComponentMeasuresHistory(component: string, metricKeys: string[]) {
    this.API_OPTIONS.params = {
      component,
      metrics: metricKeys.join(',')
    };
    return this.http.get(this.URL_PREFIX + '/measures/search_history', this.API_OPTIONS);
  }

}
