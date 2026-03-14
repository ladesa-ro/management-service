import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeListQuery } from "./modalidade-list.query";
import type { ModalidadeListQueryResult } from "./modalidade-list.query.result";
export type IModalidadeListQuery = {
  accessContext: AccessContext;
  dto: ModalidadeListQuery | null;
  selection?: string[] | boolean;
};

export type IModalidadeListQueryHandler = IQueryHandler<
  IModalidadeListQuery,
  ModalidadeListQueryResult
>;
export const IModalidadeListQueryHandler = Symbol("IModalidadeListQueryHandler");
