import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { ProjectTrend } from '../../../../services/tpl-sonar-qube/models/project-trend.model';

@Component({
  selector: 'tpl-project-trend',
  templateUrl: './project-trend.component.html',
  styleUrls: ['./project-trend.component.scss']
})
export class ProjectTrendComponent implements OnInit {

  @Input() projectTrend: ProjectTrend;

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Trend'
    },
    credits: {
      enabled: false
    }
  });

  constructor() { }

  ngOnInit(): void {
    this.chart.ref$.subscribe(ref => {
      ref.xAxis[0].setCategories(this.projectTrend.dates);
    });
    this.projectTrend.trends.forEach(trend => {
      this.chart.addSeries({
        name: trend.name,
        data: trend.values,
        type: 'line'
      }, true, true);
    });
  }

}
