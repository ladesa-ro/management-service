import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQueryResult } from "./usuario-find-one.query.result";
export type IUsuarioFindByMatriculaQuery = {
  matricula: string;
  selection?: string[] | boolean;
};

export const IUsuarioFindByMatriculaQueryHandler = Symbol("IUsuarioFindByMatriculaQueryHandler");

export type IUsuarioFindByMatriculaQueryHandler = IQueryHandler<
  IUsuarioFindByMatriculaQuery,
  UsuarioFindOneQueryResult | null
>;
