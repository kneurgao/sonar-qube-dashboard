import { Component, OnInit } from '@angular/core';

import { TplSonarQubeService } from '../../services/tpl-sonar-qube/tpl-sonar-qube.service';
import { ProjectSearchResult } from '../../services/tpl-sonar-qube/models/project-search-result.model';

@Component({
  selector: 'tpl-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectSearchResult: ProjectSearchResult;
  constructor(private tplSonarQubeService: TplSonarQubeService) { }

  ngOnInit(): void {
    this.tplSonarQubeService.searchProjects().subscribe((projectSearchResult: ProjectSearchResult) => {
      this.projectSearchResult = projectSearchResult;
    });
  }

}
