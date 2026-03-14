import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstadoListInputDto, EstadoListOutputDto } from "../../application/dtos";

export type IEstadoListQuery = {
  accessContext: AccessContext;
  dto: EstadoListInputDto | null;
};

export type IEstadoListQueryHandler = IQueryHandler<IEstadoListQuery, EstadoListOutputDto>;
export const IEstadoListQueryHandler = Symbol("IEstadoListQueryHandler");
