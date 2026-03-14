import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
} from "../../application/dtos";

export type IHorarioGeradoAulaListQuery = {
  accessContext: AccessContext;
  dto: HorarioGeradoAulaListInputDto | null;
  selection?: string[] | boolean;
};

export type IHorarioGeradoAulaListQueryHandler = IQueryHandler<
  IHorarioGeradoAulaListQuery,
  HorarioGeradoAulaListOutputDto
>;
export const IHorarioGeradoAulaListQueryHandler = Symbol("IHorarioGeradoAulaListQueryHandler");
