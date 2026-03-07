export class PaginationInputDto {
  page?: number | null | undefined;
  limit?: number | null | undefined;
  search?: string | null | undefined;
  sortBy?: string[] | null | undefined;
  selection?: string[] | null | undefined;
}
