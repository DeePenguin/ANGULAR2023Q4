import type { PaginationApi } from '../models/pagination-api.model'
import type { Pagination } from '../models/pagination.model'

export const convertPaginationApiToPagination = ({
  totalResults,
  resultsPerPage,
  ...rest
}: PaginationApi): Pagination => ({
  length: totalResults,
  pageSize: resultsPerPage,
  ...rest,
})
