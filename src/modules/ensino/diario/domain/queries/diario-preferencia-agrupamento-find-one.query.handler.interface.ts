import type { IQueryHandler } from "@/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoFindOneQuery } from "./diario-preferencia-agrupamento-find-one.query";
import type { DiarioPreferenciaAgrupamentoFindOneQueryResult } from "./diario-preferencia-agrupamento-find-one.query.result";

export const IDiarioPreferenciaAgrupamentoFindOneQueryHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoFindOneQueryHandler",
);

export type IDiarioPreferenciaAgrupamentoFindOneQueryHandler = IQueryHandler<
  DiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneQueryResult | null
>;
