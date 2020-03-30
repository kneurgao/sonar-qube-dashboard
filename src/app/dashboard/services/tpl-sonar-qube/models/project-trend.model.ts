import { Measure } from './measure.model';

export class ProjectTrend {
  metric: string;
  values: {
    date: Date;
    value: number;
  }[];

  constructor() {
    this.values = [];
  }
}
