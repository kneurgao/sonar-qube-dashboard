import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectMeasuresComponent } from './project-measures/project-measures.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectMeasuresComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
