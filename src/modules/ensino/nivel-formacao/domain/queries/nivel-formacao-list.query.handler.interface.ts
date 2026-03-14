import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { NivelFormacaoListInputDto, NivelFormacaoListOutputDto } from "../../application/dtos";

export type INivelFormacaoListQuery = {
  accessContext: AccessContext;
  dto: NivelFormacaoListInputDto | null;
  selection?: string[] | boolean;
};

export type INivelFormacaoListQueryHandler = IQueryHandler<
  INivelFormacaoListQuery,
  NivelFormacaoListOutputDto
>;
export const INivelFormacaoListQueryHandler = Symbol("INivelFormacaoListQueryHandler");
