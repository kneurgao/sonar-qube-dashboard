import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectCardComponent } from './project-card/project-card.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCardComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ProjectsRoutingModule,
    NgbNavModule
  ]
})
export class ProjectsModule { }
