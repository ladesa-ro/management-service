import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneInputDto, CursoFindOneOutputDto } from "../../application/dtos";

export type ICursoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: CursoFindOneInputDto;
  selection?: string[] | boolean;
};

export type ICursoFindOneQueryHandler = IQueryHandler<
  ICursoFindOneQuery,
  CursoFindOneOutputDto | null
>;
export const ICursoFindOneQueryHandler = Symbol("ICursoFindOneQueryHandler");
