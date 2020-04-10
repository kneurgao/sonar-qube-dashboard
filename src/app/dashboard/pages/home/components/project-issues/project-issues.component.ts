import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { forkJoin } from 'rxjs';

import { SonarQubeService } from '../../../../../services/sonar-qube/sonar-qube.service';
import { SonarQubeHelper } from '../../../../../services/sonar-qube/sonar-qube.helper';

@Component({
  selector: 'tpl-project-issues',
  templateUrl: './project-issues.component.html',
  styleUrls: ['./project-issues.component.scss']
})
export class ProjectIssuesComponent implements OnInit {
  loaded = false;

  chart = new Chart({
    chart: {
      type: 'column'
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
          text: 'Issues',
          reserveSpace: false
        }
      }
    ],
    legend: {
      verticalAlign: 'top',
      align: 'right',
      layout: 'vertical',
      floating: true
    },
    tooltip: {
      shared: true,
      borderColor: 'rgb(254, 254, 254)'
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0.1
      },
      series: {
        dataLabels: {
          enabled: true
        }
      }
    },
    credits: {
      enabled: false
    }
  });

  constructor(
    private sonarQubeService: SonarQubeService,
    private sonarQubeHelper: SonarQubeHelper
  ) {}

  ngOnInit(): void {
    this.fetchProjectIssues();
  }

  fetchProjectIssues() {
    const componentKeys = [];
    const facets = ['projects'];
    const customAttributesAll = {
      ps: 1,
      assigned: 'true'
    };
    const customAttributesFixed = {
      ps: 1,
      assigned: 'true',
      resolved: 'yes'
    };

    forkJoin([
      this.sonarQubeService.searchIssues(
        componentKeys,
        facets,
        customAttributesAll
      ),
      this.sonarQubeService.searchIssues(
        componentKeys,
        facets,
        customAttributesFixed
      )
    ]).subscribe((issueSearchResults: any) => {
      const projectIssues = this.sonarQubeHelper.parseProjectIssues(
        issueSearchResults
      );

      this.chart.ref$.subscribe(ref => {
        ref.xAxis[0].setCategories(projectIssues.projects);
      });

      const allSeries: Highcharts.SeriesOptionsType = {
        name: 'Total',
        data: projectIssues.allIssues,
        type: 'column',
        color: 'rgb(212, 51, 63)',
        pointPadding: 0.2,
        // pointPlacement: -0.1
      };
      this.chart.addSeries(allSeries, true, true);

      const fixedSeries: Highcharts.SeriesOptionsType = {
        name: 'Fixed',
        data: projectIssues.fixedIssues,
        type: 'column',
        color: 'rgb(0, 170, 0)',
        pointPadding: 0.1,
        // pointPlacement: -0.2
      };
      this.chart.addSeries(fixedSeries, true, true);

      this.loaded = true;
    });
  }

}
