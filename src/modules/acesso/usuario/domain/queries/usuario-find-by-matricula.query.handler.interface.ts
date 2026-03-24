import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { UsuarioFindOneQueryResult } from "./usuario-find-one.query.result";

export const UsuarioFindByMatriculaQueryMetadata = createOperationMetadata({
  operationId: "usuarioFindByMatricula",
  summary: "Busca um usuario por matricula",
});

export type IUsuarioFindByMatriculaQuery = {
  matricula: string;
};

export const IUsuarioFindByMatriculaQueryHandler = Symbol("IUsuarioFindByMatriculaQueryHandler");

export type IUsuarioFindByMatriculaQueryHandler = IQueryHandler<
  IUsuarioFindByMatriculaQuery,
  UsuarioFindOneQueryResult | null
>;
