import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { PerfilFindOneInputDto, PerfilFindOneOutputDto } from "../../application/dtos";

export type IPerfilFindOneQuery = {
  accessContext: AccessContext;
  dto: PerfilFindOneInputDto;
  selection?: string[] | boolean;
};

export type IPerfilFindOneQueryHandler = IQueryHandler<
  IPerfilFindOneQuery,
  PerfilFindOneOutputDto | null
>;
export const IPerfilFindOneQueryHandler = Symbol("IPerfilFindOneQueryHandler");
