import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoListQuery } from "./diario-preferencia-agrupamento-list.query";
import type { DiarioPreferenciaAgrupamentoListQueryResult } from "./diario-preferencia-agrupamento-list.query.result";
export type IDiarioPreferenciaAgrupamentoListQuery = {
  accessContext: AccessContext;
  dto: DiarioPreferenciaAgrupamentoListQuery | null;
  selection?: string[] | boolean;
};

export type IDiarioPreferenciaAgrupamentoListQueryHandler = IQueryHandler<
  IDiarioPreferenciaAgrupamentoListQuery,
  DiarioPreferenciaAgrupamentoListQueryResult
>;
export const IDiarioPreferenciaAgrupamentoListQueryHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoListQueryHandler",
);
