import type { IQueryHandler } from "@/domain/abstractions";
import type { ModalidadeListQuery } from "./modalidade-list.query";
import type { ModalidadeListQueryResult } from "./modalidade-list.query.result";

export const IModalidadeListQueryHandler = Symbol("IModalidadeListQueryHandler");

export type IModalidadeListQueryHandler = IQueryHandler<
  ModalidadeListQuery | null,
  ModalidadeListQueryResult
>;
