import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiaCalendarioListInputDto, DiaCalendarioListOutputDto } from "../../application/dtos";

export type IDiaCalendarioListQuery = {
  accessContext: AccessContext;
  dto: DiaCalendarioListInputDto | null;
  selection?: string[] | boolean;
};

export type IDiaCalendarioListQueryHandler = IQueryHandler<
  IDiaCalendarioListQuery,
  DiaCalendarioListOutputDto
>;
export const IDiaCalendarioListQueryHandler = Symbol("IDiaCalendarioListQueryHandler");
