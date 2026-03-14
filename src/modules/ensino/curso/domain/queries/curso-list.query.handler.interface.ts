import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoListInputDto, CursoListOutputDto } from "../../application/dtos";

export type ICursoListQuery = {
  accessContext: AccessContext;
  dto: CursoListInputDto | null;
  selection?: string[] | boolean;
};

export type ICursoListQueryHandler = IQueryHandler<ICursoListQuery, CursoListOutputDto>;
export const ICursoListQueryHandler = Symbol("ICursoListQueryHandler");
