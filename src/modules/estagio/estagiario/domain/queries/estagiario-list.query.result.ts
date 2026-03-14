import { EstagiarioFindOneQueryResult } from "./estagiario-find-one.query.result";

export class EstagiarioListQueryResult {
  data!: EstagiarioFindOneQueryResult[];
  total!: number;
  page!: number;
  limit!: number;
}
