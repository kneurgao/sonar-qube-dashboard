export class ProjectIssues {
  projects: string[];
  allIssues: number[];
  fixedIssues: number[];

  constructor() {
    this.projects = [];
    this.allIssues = [];
    this.fixedIssues = [];
  }
}
