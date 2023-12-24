export interface PaginationApi {
  prevPageToken?: string
  nextPageToken?: string
  totalResults: number
  resultsPerPage: number
}
