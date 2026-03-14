import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiaCalendarioFindOneInputDto,
  DiaCalendarioFindOneOutputDto,
} from "../../application/dtos";

export type IDiaCalendarioFindOneQuery = {
  accessContext: AccessContext | null;
  dto: DiaCalendarioFindOneInputDto;
  selection?: string[] | boolean;
};

export type IDiaCalendarioFindOneQueryHandler = IQueryHandler<
  IDiaCalendarioFindOneQuery,
  DiaCalendarioFindOneOutputDto | null
>;
export const IDiaCalendarioFindOneQueryHandler = Symbol("IDiaCalendarioFindOneQueryHandler");
