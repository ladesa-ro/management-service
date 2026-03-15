import { EstagioFindOneQueryResult } from "./estagio-find-one.query.result";

export class EstagioListQueryResult {
  data!: EstagioFindOneQueryResult[];
  total!: number;
  page!: number;
  limit!: number;
}
