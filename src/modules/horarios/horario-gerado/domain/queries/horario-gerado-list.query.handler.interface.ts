import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { HorarioGeradoListInputDto, HorarioGeradoListOutputDto } from "../../application/dtos";

export type IHorarioGeradoListQuery = {
  accessContext: AccessContext;
  dto: HorarioGeradoListInputDto | null;
  selection?: string[] | boolean;
};

export type IHorarioGeradoListQueryHandler = IQueryHandler<
  IHorarioGeradoListQuery,
  HorarioGeradoListOutputDto
>;
export const IHorarioGeradoListQueryHandler = Symbol("IHorarioGeradoListQueryHandler");
