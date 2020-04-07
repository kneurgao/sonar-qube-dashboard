import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { SonarQubeService } from '../../../../../services/sonar-qube/sonar-qube.service';
import { SonarQubeHelper } from '../../../../../services/sonar-qube/sonar-qube.helper';

@Component({
  selector: 'tpl-project-trend',
  templateUrl: './project-trend.component.html',
  styleUrls: ['./project-trend.component.scss']
})
export class ProjectTrendComponent implements OnInit {

  @Input() projectKey: string;
  loaded = false;

  chart = new Chart({
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: ''
    },
    xAxis: {
      title: {
        text: '',
        reserveSpace: false
      }
    },
    yAxis: [
      {
        title: {
          text: 'Violations'
        }
      },
      {
        labels: {
          format: '{value} %'
        },
        title: {
          text: 'Duplications'
        },
        opposite: true
      }
    ],
    tooltip: {
      shared: true,
      borderColor: 'rgb(254, 254, 254)'
    },
    credits: {
      enabled: false
    }
  });

  constructor(private sonarQubeService: SonarQubeService,
              private sonarQubeHelper: SonarQubeHelper) { }

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
    this.sonarQubeService.getComponentMeasuresHistory(this.projectKey, metricKeys)
    .subscribe((componentMeasuresHistory: any) => {
      const projectTrend = this.sonarQubeHelper.parseComponentMeasuresHistory(componentMeasuresHistory);

      this.chart.ref$.subscribe(ref => {
        ref.xAxis[0].setCategories(projectTrend.dates);
      });

      projectTrend.trends.forEach(trend => {
        const series: Highcharts.SeriesOptionsType = {
          name: trend.name,
          data: trend.values,
          type: 'spline',
        };

        if (trend.name.indexOf('Duplicated') !== -1) {
          series.yAxis = 1;
          series.tooltip = {
            valueSuffix: ' %'
          };
        }

        this.chart.addSeries(series, true, true);
      });

      this.loaded = true;
    });
  }

}
