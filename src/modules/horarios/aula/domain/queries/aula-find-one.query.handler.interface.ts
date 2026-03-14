import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AulaFindOneInputDto, AulaFindOneOutputDto } from "../../application/dtos";

export type IAulaFindOneQuery = {
  accessContext: AccessContext | null;
  dto: AulaFindOneInputDto;
  selection?: string[] | boolean;
};

export type IAulaFindOneQueryHandler = IQueryHandler<
  IAulaFindOneQuery,
  AulaFindOneOutputDto | null
>;
export const IAulaFindOneQueryHandler = Symbol("IAulaFindOneQueryHandler");
