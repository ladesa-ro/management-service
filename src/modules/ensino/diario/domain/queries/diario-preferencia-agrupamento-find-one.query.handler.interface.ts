import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoFindOneQuery } from "./diario-preferencia-agrupamento-find-one.query";
import type { DiarioPreferenciaAgrupamentoFindOneQueryResult } from "./diario-preferencia-agrupamento-find-one.query.result";

export type IDiarioPreferenciaAgrupamentoFindOneQueryHandler = IQueryHandler<
  DiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneQueryResult | null
>;
export const IDiarioPreferenciaAgrupamentoFindOneQueryHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoFindOneQueryHandler",
);
