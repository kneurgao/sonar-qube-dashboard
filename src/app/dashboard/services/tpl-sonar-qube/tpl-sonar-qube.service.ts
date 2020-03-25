import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DashboardModule } from '../../dashboard.module';
import { ProjectSearchResult } from './models/project-search-result.model';

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
    withCredentials: true
  };

  constructor(private http: HttpClient) { }

  searchProjects() {
    return this.http.get<ProjectSearchResult>(this.URL_PREFIX + '/projects/search', this.API_OPTIONS);
  }
}
