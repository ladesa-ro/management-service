import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
} from "../../application/dtos";

export type IIntervaloDeTempoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: IntervaloDeTempoFindOneInputDto;
};

export type IIntervaloDeTempoFindOneQueryHandler = IQueryHandler<
  IIntervaloDeTempoFindOneQuery,
  IntervaloDeTempoFindOneOutputDto | null
>;
export const IIntervaloDeTempoFindOneQueryHandler = Symbol("IIntervaloDeTempoFindOneQueryHandler");
