import { Measure } from './measure.model';

export class ProjectMeasures {
  passed: boolean;
  measures: Measure[];

  constructor() {
    this.measures = [];
  }
}
