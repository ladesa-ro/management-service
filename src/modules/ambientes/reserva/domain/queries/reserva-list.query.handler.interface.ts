import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ReservaListInputDto, ReservaListOutputDto } from "../../application/dtos";

export type IReservaListQuery = {
  accessContext: AccessContext;
  dto: ReservaListInputDto | null;
  selection?: string[] | boolean;
};

export type IReservaListQueryHandler = IQueryHandler<IReservaListQuery, ReservaListOutputDto>;
export const IReservaListQueryHandler = Symbol("IReservaListQueryHandler");
