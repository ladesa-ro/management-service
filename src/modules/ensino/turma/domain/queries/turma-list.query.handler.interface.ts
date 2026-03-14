import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaListInputDto, TurmaListOutputDto } from "../../application/dtos";

export type ITurmaListQuery = {
  accessContext: AccessContext;
  dto: TurmaListInputDto | null;
  selection?: string[] | boolean;
};

export type ITurmaListQueryHandler = IQueryHandler<ITurmaListQuery, TurmaListOutputDto>;
export const ITurmaListQueryHandler = Symbol("ITurmaListQueryHandler");
