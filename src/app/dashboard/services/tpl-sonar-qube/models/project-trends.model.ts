import { Trend } from './trend.model';

export class ProjectTrends {
  dates: string[];
  trends: Trend[];

  constructor() {
    this.trends = [];
  }
}
