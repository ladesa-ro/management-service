import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneInputDto, TurmaFindOneOutputDto } from "../../application/dtos";

export type ITurmaFindOneQuery = {
  accessContext: AccessContext | null;
  dto: TurmaFindOneInputDto;
  selection?: string[] | boolean;
};

export type ITurmaFindOneQueryHandler = IQueryHandler<
  ITurmaFindOneQuery,
  TurmaFindOneOutputDto | null
>;
export const ITurmaFindOneQueryHandler = Symbol("ITurmaFindOneQueryHandler");
