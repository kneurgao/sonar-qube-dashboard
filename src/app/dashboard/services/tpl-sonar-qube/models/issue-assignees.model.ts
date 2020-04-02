export class IssueAssignees {
  assignees: string[];
  allIssues: number[];
  fixedIssues: number[];

  constructor() {
    this.assignees = [];
    this.allIssues = [];
    this.fixedIssues = [];
  }
}
