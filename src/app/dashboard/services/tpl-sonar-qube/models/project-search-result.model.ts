import { Paging } from './paging.model';
import { ProjectComponent } from './project-component.model';

export class ProjectSearchResult {
  paging: Paging;
  components: ProjectComponent[];
}
