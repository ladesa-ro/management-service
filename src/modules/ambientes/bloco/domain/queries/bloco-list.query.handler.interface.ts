import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoListInputDto, BlocoListOutputDto } from "../../application/dtos";

export type IBlocoListQuery = {
  accessContext: AccessContext;
  dto: BlocoListInputDto | null;
  selection?: string[] | boolean;
};

export type IBlocoListQueryHandler = IQueryHandler<IBlocoListQuery, BlocoListOutputDto>;
export const IBlocoListQueryHandler = Symbol("IBlocoListQueryHandler");
