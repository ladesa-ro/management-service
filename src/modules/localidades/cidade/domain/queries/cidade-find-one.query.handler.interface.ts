import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CidadeFindOneInputDto, CidadeFindOneOutputDto } from "../../application/dtos";

export type ICidadeFindOneQuery = {
  accessContext: AccessContext;
  dto: CidadeFindOneInputDto;
};

export type ICidadeFindOneQueryHandler = IQueryHandler<
  ICidadeFindOneQuery,
  CidadeFindOneOutputDto | null
>;
export const ICidadeFindOneQueryHandler = Symbol("ICidadeFindOneQueryHandler");
