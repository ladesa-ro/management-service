import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  IntervaloDeTempoListInputDto,
  IntervaloDeTempoListOutputDto,
} from "../../application/dtos";

export type IIntervaloDeTempoListQuery = {
  accessContext: AccessContext;
  dto: IntervaloDeTempoListInputDto | null;
};

export type IIntervaloDeTempoListQueryHandler = IQueryHandler<
  IIntervaloDeTempoListQuery,
  IntervaloDeTempoListOutputDto
>;
export const IIntervaloDeTempoListQueryHandler = Symbol("IIntervaloDeTempoListQueryHandler");
