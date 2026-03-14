import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
} from "../../application/dtos";

export type ICalendarioLetivoListQuery = {
  accessContext: AccessContext;
  dto: CalendarioLetivoListInputDto | null;
  selection?: string[] | boolean;
};

export type ICalendarioLetivoListQueryHandler = IQueryHandler<
  ICalendarioLetivoListQuery,
  CalendarioLetivoListOutputDto
>;
export const ICalendarioLetivoListQueryHandler = Symbol("ICalendarioLetivoListQueryHandler");
