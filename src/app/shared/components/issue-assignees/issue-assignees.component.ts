import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { forkJoin } from 'rxjs';

import { SonarQubeService } from '../../../services/sonar-qube/sonar-qube.service';
import { SonarQubeHelper } from '../../../services/sonar-qube/sonar-qube.helper';

@Component({
  selector: 'tpl-issue-assignees',
  templateUrl: './issue-assignees.component.html',
  styleUrls: ['./issue-assignees.component.scss']
})
export class IssueAssigneesComponent implements OnInit {
  @Input() projectKey: string;
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
    this.fetchIssueAssignees();
  }

  fetchIssueAssignees() {
    const componentKeys = [this.projectKey];
    const facets = ['assignees'];
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
      const issueAssignees = this.sonarQubeHelper.parseIssueAssignees(
        issueSearchResults
      );

      this.chart.ref$.subscribe(ref => {
        ref.xAxis[0].setCategories(issueAssignees.assignees);
      });

      const allSeries: Highcharts.SeriesOptionsType = {
        name: 'Total',
        data: issueAssignees.allIssues,
        type: 'column',
        color: 'rgb(212, 51, 63)',
        pointPadding: 0.2,
        // pointPlacement: -0.1
      };
      this.chart.addSeries(allSeries, true, true);

      const fixedSeries: Highcharts.SeriesOptionsType = {
        name: 'Fixed',
        data: issueAssignees.fixedIssues,
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
