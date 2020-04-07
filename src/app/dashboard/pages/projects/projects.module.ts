import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../../../shared/shared.module';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectTrendComponent } from './components/project-trend/project-trend.component';
import { ProjectMeasuresComponent } from './components/project-measures/project-measures.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCardComponent,
    ProjectTrendComponent,
    ProjectMeasuresComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ProjectsRoutingModule,
    SharedModule
  ]
})
export class ProjectsModule { }
