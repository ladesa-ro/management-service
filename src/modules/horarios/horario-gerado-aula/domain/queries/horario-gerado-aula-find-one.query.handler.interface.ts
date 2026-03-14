import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
} from "../../application/dtos";

export type IHorarioGeradoAulaFindOneQuery = {
  accessContext: AccessContext | null;
  dto: HorarioGeradoAulaFindOneInputDto;
  selection?: string[] | boolean;
};

export type IHorarioGeradoAulaFindOneQueryHandler = IQueryHandler<
  IHorarioGeradoAulaFindOneQuery,
  HorarioGeradoAulaFindOneOutputDto | null
>;
export const IHorarioGeradoAulaFindOneQueryHandler = Symbol(
  "IHorarioGeradoAulaFindOneQueryHandler",
);
