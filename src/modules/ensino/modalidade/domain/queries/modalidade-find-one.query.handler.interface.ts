import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeFindOneQuery } from "./modalidade-find-one.query";
import type { ModalidadeFindOneQueryResult } from "./modalidade-find-one.query.result";
export type IModalidadeFindOneQuery = {
  accessContext: AccessContext | null;
  dto: ModalidadeFindOneQuery;
  selection?: string[] | boolean;
};

export type IModalidadeFindOneQueryHandler = IQueryHandler<
  IModalidadeFindOneQuery,
  ModalidadeFindOneQueryResult | null
>;
export const IModalidadeFindOneQueryHandler = Symbol("IModalidadeFindOneQueryHandler");
