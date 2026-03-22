import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";

export const UsuarioGetImagemPerfilQueryMetadata = createOperationMetadata({
  operationId: "usuarioGetImagemPerfil",
  summary: "Busca imagem de perfil de um usuario",
});

export const IUsuarioGetImagemPerfilQueryHandler = Symbol("IUsuarioGetImagemPerfilQueryHandler");

export type IUsuarioGetImagemPerfilQueryHandler = IQueryHandler<
  UsuarioFindOneQuery,
  StreamableFile
>;
