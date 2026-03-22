import type { IQueryHandler } from "@/domain/abstractions";
import type { ModalidadeFindOneQuery } from "./modalidade-find-one.query";
import type { ModalidadeFindOneQueryResult } from "./modalidade-find-one.query.result";

export const IModalidadeFindOneQueryHandler = Symbol("IModalidadeFindOneQueryHandler");

export type IModalidadeFindOneQueryHandler = IQueryHandler<
  ModalidadeFindOneQuery,
  ModalidadeFindOneQueryResult | null
>;
