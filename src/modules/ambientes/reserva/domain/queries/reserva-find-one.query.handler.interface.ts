import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { ReservaFindOneInputDto, ReservaFindOneOutputDto } from "../../application/dtos";

export type IReservaFindOneQuery = {
  accessContext: AccessContext | null;
  dto: ReservaFindOneInputDto;
  selection?: string[] | boolean;
};

export type IReservaFindOneQueryHandler = IQueryHandler<
  IReservaFindOneQuery,
  ReservaFindOneOutputDto | null
>;
export const IReservaFindOneQueryHandler = Symbol("IReservaFindOneQueryHandler");
