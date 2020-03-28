import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

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
    ProjectsRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class ProjectsModule { }
