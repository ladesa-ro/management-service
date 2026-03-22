import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IStreamableFileResult } from "@/domain/abstractions/storage";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";

export const UsuarioGetImagemCapaQueryMetadata = createOperationMetadata({
  operationId: "usuarioGetImagemCapa",
  summary: "Busca imagem de capa de um usuario",
});

export const IUsuarioGetImagemCapaQueryHandler = Symbol("IUsuarioGetImagemCapaQueryHandler");

export type IUsuarioGetImagemCapaQueryHandler = IQueryHandler<
  UsuarioFindOneQuery,
  IStreamableFileResult
>;
