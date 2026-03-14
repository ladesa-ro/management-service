import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AulaListInputDto, AulaListOutputDto } from "../../application/dtos";

export type IAulaListQuery = {
  accessContext: AccessContext;
  dto: AulaListInputDto | null;
  selection?: string[] | boolean;
};

export type IAulaListQueryHandler = IQueryHandler<IAulaListQuery, AulaListOutputDto>;
export const IAulaListQueryHandler = Symbol("IAulaListQueryHandler");
