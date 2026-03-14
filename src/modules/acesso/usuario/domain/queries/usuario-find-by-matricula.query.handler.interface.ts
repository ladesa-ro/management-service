import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQueryResult } from "./usuario-find-one.query.result";
export type IUsuarioFindByMatriculaQuery = {
  matricula: string;
  selection?: string[] | boolean;
};

export type IUsuarioFindByMatriculaQueryHandler = IQueryHandler<
  IUsuarioFindByMatriculaQuery,
  UsuarioFindOneQueryResult | null
>;
export const IUsuarioFindByMatriculaQueryHandler = Symbol("IUsuarioFindByMatriculaQueryHandler");
