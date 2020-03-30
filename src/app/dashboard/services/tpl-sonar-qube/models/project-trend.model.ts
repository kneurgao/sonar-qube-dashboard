import { Trend } from './trend.model';

export class ProjectTrend {
  dates: string[];
  trends: Trend[];

  constructor() {
    this.trends = [];
  }
}
