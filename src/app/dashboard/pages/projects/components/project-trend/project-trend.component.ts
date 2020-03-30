import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { TplSonarQubeService } from '../../../../services/tpl-sonar-qube/tpl-sonar-qube.service';
import { TplSonarQubeHelper } from '../../../../services/tpl-sonar-qube/tpl-sonar-qube.helper';

@Component({
  selector: 'tpl-project-trend',
  templateUrl: './project-trend.component.html',
  styleUrls: ['./project-trend.component.scss']
})
export class ProjectTrendComponent implements OnInit {

  @Input() projectKey: string;

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    }
  });

  constructor(private tplSonarQubeService: TplSonarQubeService,
              private tplSonarQubeHelper: TplSonarQubeHelper) { }

  ngOnInit(): void {
    this.fetchProjectMeasuresHistory();
  }

  fetchProjectMeasuresHistory() {
    const metricKeys = [
      'bugs',
      'vulnerabilities',
      'code_smells',
      'duplicated_lines_density'
    ];
    this.tplSonarQubeService.getComponentMeasuresHistory(this.projectKey, metricKeys)
    .subscribe((componentMeasuresHistory: any) => {
      const projectTrend = this.tplSonarQubeHelper.parseComponentMeasuresHistory(componentMeasuresHistory);

      this.chart.ref$.subscribe(ref => {
        ref.xAxis[0].setCategories(projectTrend.dates);
      });

      projectTrend.trends.forEach(trend => {
        this.chart.addSeries({
          name: trend.name,
          data: trend.values,
          type: 'line'
        }, true, true);
      });
    });
  }

}
