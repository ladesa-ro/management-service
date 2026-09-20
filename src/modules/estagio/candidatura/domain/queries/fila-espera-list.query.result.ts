import type { IFilaEsperaItem } from "../repositories/estagio-candidatura.repository.interface";

export interface FilaEsperaListQueryResult {
  data: IFilaEsperaItem[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
}
