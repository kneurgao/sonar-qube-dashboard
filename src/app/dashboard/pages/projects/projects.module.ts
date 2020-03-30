import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectTrendComponent } from './components/project-trend/project-trend.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCardComponent,
    ProjectTrendComponent
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
