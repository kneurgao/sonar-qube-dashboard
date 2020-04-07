import { Component, OnInit } from '@angular/core';

import { SonarQubeService } from '../../../services/sonar-qube/sonar-qube.service';
import { ProjectSearchResult } from '../../../services/sonar-qube/models/project-search-result.model';

@Component({
  selector: 'tpl-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectSearchResult: ProjectSearchResult;
  constructor(private sonarQubeService: SonarQubeService) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.sonarQubeService.searchProjects()
    .subscribe((projectSearchResult: ProjectSearchResult) => {
      this.projectSearchResult = projectSearchResult;
    });
  }
}
