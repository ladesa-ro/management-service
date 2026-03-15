import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeListQuery } from "./modalidade-list.query";
import type { ModalidadeListQueryResult } from "./modalidade-list.query.result";

export type IModalidadeListQueryHandler = IQueryHandler<
  ModalidadeListQuery | null,
  ModalidadeListQueryResult
>;
export const IModalidadeListQueryHandler = Symbol("IModalidadeListQueryHandler");
