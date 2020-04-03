import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectTrendComponent } from './components/project-trend/project-trend.component';
import { ProjectMeasuresComponent } from './components/project-measures/project-measures.component';
import { IssueAssigneesComponent } from './components/issue-assignees/issue-assignees.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCardComponent,
    ProjectTrendComponent,
    ProjectMeasuresComponent,
    IssueAssigneesComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbNavModule,
    ChartModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
