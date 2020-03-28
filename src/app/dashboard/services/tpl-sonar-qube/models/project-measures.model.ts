import { Measure } from './measure.model';
import { Metric } from './metric.model';

export class ProjectMeasures {
  component: {
    measures: Measure[];
  };
  metrics: Metric[]
}
