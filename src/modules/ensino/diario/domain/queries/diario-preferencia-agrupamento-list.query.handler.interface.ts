import type { IQueryHandler } from "@/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoListQuery } from "./diario-preferencia-agrupamento-list.query";
import type { DiarioPreferenciaAgrupamentoListQueryResult } from "./diario-preferencia-agrupamento-list.query.result";

export const IDiarioPreferenciaAgrupamentoListQueryHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoListQueryHandler",
);

export type IDiarioPreferenciaAgrupamentoListQueryHandler = IQueryHandler<
  DiarioPreferenciaAgrupamentoListQuery | null,
  DiarioPreferenciaAgrupamentoListQueryResult
>;
