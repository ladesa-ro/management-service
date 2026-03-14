import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoFindOneQuery } from "./diario-preferencia-agrupamento-find-one.query";
import type { DiarioPreferenciaAgrupamentoFindOneQueryResult } from "./diario-preferencia-agrupamento-find-one.query.result";
export type IDiarioPreferenciaAgrupamentoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: DiarioPreferenciaAgrupamentoFindOneQuery;
  selection?: string[] | boolean;
};

export type IDiarioPreferenciaAgrupamentoFindOneQueryHandler = IQueryHandler<
  IDiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneQueryResult | null
>;
export const IDiarioPreferenciaAgrupamentoFindOneQueryHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoFindOneQueryHandler",
);
