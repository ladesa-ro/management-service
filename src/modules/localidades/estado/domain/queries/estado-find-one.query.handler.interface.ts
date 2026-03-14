import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstadoFindOneInputDto, EstadoFindOneOutputDto } from "../../application/dtos";

export type IEstadoFindOneQuery = {
  accessContext: AccessContext;
  dto: EstadoFindOneInputDto;
};

export type IEstadoFindOneQueryHandler = IQueryHandler<
  IEstadoFindOneQuery,
  EstadoFindOneOutputDto | null
>;
export const IEstadoFindOneQueryHandler = Symbol("IEstadoFindOneQueryHandler");
