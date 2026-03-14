import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioFindOneQuery } from "./diario-find-one.query";
import type { DiarioFindOneQueryResult } from "./diario-find-one.query.result";
export type IDiarioFindOneQuery = {
  accessContext: AccessContext | null;
  dto: DiarioFindOneQuery;
  selection?: string[] | boolean;
};

export type IDiarioFindOneQueryHandler = IQueryHandler<
  IDiarioFindOneQuery,
  DiarioFindOneQueryResult | null
>;
export const IDiarioFindOneQueryHandler = Symbol("IDiarioFindOneQueryHandler");
