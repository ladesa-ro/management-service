import { EmpresaFindOneQueryResult } from "./empresa-find-one.query.result";

export class EmpresaListQueryResult {
  data!: EmpresaFindOneQueryResult[];
  total!: number;
  page!: number;
  limit!: number;
}
