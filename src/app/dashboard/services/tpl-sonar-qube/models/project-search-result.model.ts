export class ProjectSearchResult {
  paging: {
    pageIndex: number,
    pageSize: number,
    total: number
  };
  components: {
    organization: string,
    key: string,
    name: string,
    qualifier: string,
    visibility: string,
    lastAnalysisDate: Date,
    revision: string
  }[];
}
