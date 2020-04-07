import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';

import { IssueAssigneesComponent } from './components/issue-assignees/issue-assignees.component';

@NgModule({
  declarations: [
    IssueAssigneesComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    ChartModule,
    IssueAssigneesComponent
  ]
})
export class SharedModule { }
