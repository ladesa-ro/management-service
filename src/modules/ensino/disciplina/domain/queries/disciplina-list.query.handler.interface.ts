import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaListInputDto, DisciplinaListOutputDto } from "../../application/dtos";

export type IDisciplinaListQuery = {
  accessContext: AccessContext;
  dto: DisciplinaListInputDto | null;
  selection?: string[] | boolean;
};

export type IDisciplinaListQueryHandler = IQueryHandler<
  IDisciplinaListQuery,
  DisciplinaListOutputDto
>;
export const IDisciplinaListQueryHandler = Symbol("IDisciplinaListQueryHandler");
