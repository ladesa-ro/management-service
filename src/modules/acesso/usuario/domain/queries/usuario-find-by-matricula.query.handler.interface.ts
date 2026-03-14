import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneOutputDto } from "../../application/dtos";

export type IUsuarioFindByMatriculaQuery = {
  matricula: string;
  selection?: string[] | boolean;
};

export type IUsuarioFindByMatriculaQueryHandler = IQueryHandler<
  IUsuarioFindByMatriculaQuery,
  UsuarioFindOneOutputDto | null
>;
export const IUsuarioFindByMatriculaQueryHandler = Symbol("IUsuarioFindByMatriculaQueryHandler");
