import { Injectable } from '@angular/core';
import { DashboardModule } from '../../dashboard/dashboard.module';

@Injectable({
  providedIn: DashboardModule
})
export class SharedService {

  METRICS = {};
  constructor() { }

  saveMetrics(metrics: any[]) {
    metrics.forEach(metric => {
      this.METRICS[metric.key] = metric.name;
    });
  }

  getMetric(key: string) {
    return this.METRICS[key];
  }
}
