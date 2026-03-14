import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CidadeListInputDto, CidadeListOutputDto } from "../../application/dtos";

export type ICidadeListQuery = {
  accessContext: AccessContext;
  dto: CidadeListInputDto | null;
};

export type ICidadeListQueryHandler = IQueryHandler<ICidadeListQuery, CidadeListOutputDto>;
export const ICidadeListQueryHandler = Symbol("ICidadeListQueryHandler");
