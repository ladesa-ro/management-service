import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteListInputDto, AmbienteListOutputDto } from "../../application/dtos";

export type IAmbienteListQuery = {
  accessContext: AccessContext;
  dto: AmbienteListInputDto | null;
  selection?: string[] | boolean;
};

export type IAmbienteListQueryHandler = IQueryHandler<IAmbienteListQuery, AmbienteListOutputDto>;
export const IAmbienteListQueryHandler = Symbol("IAmbienteListQueryHandler");
