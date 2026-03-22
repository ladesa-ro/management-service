import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { UsuarioEnsinoQueryResult } from "./usuario-ensino.query.result";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";

export const UsuarioEnsinoQueryMetadata = createOperationMetadata({
  operationId: "usuarioEnsinoById",
  summary: "Busca dados de ensino de um usuario (disciplinas, cursos e turmas onde leciona)",
});

export const IUsuarioEnsinoQueryHandler = Symbol("IUsuarioEnsinoQueryHandler");

export type IUsuarioEnsinoQueryHandler = IQueryHandler<
  UsuarioFindOneQuery,
  UsuarioEnsinoQueryResult
>;
