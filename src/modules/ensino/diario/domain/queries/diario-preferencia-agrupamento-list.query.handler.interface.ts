import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoListQuery } from "./diario-preferencia-agrupamento-list.query";
import type { DiarioPreferenciaAgrupamentoListQueryResult } from "./diario-preferencia-agrupamento-list.query.result";

export type IDiarioPreferenciaAgrupamentoListQueryHandler = IQueryHandler<
  DiarioPreferenciaAgrupamentoListQuery | null,
  DiarioPreferenciaAgrupamentoListQueryResult
>;
export const IDiarioPreferenciaAgrupamentoListQueryHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoListQueryHandler",
);
