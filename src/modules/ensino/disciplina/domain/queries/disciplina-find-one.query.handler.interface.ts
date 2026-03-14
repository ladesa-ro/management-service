import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneInputDto, DisciplinaFindOneOutputDto } from "../../application/dtos";

export type IDisciplinaFindOneQuery = {
  accessContext: AccessContext | null;
  dto: DisciplinaFindOneInputDto;
  selection?: string[] | boolean;
};

export type IDisciplinaFindOneQueryHandler = IQueryHandler<
  IDisciplinaFindOneQuery,
  DisciplinaFindOneOutputDto | null
>;
export const IDisciplinaFindOneQueryHandler = Symbol("IDisciplinaFindOneQueryHandler");
