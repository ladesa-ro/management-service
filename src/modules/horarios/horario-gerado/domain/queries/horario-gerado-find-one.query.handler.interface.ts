import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
} from "../../application/dtos";

export type IHorarioGeradoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: HorarioGeradoFindOneInputDto;
  selection?: string[] | boolean;
};

export type IHorarioGeradoFindOneQueryHandler = IQueryHandler<
  IHorarioGeradoFindOneQuery,
  HorarioGeradoFindOneOutputDto | null
>;
export const IHorarioGeradoFindOneQueryHandler = Symbol("IHorarioGeradoFindOneQueryHandler");
