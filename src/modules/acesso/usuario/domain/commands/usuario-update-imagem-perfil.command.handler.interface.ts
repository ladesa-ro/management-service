import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";

export const UsuarioUpdateImagemPerfilCommandMetadata = createOperationMetadata({
  operationId: "usuarioUpdateImagemPerfil",
  summary: "Define imagem de perfil de um usuario",
});

export type UsuarioUpdateImagemPerfilCommand = {
  dto: UsuarioFindOneQuery;
  file: Express.Multer.File;
};

export const IUsuarioUpdateImagemPerfilCommandHandler = Symbol(
  "IUsuarioUpdateImagemPerfilCommandHandler",
);

export type IUsuarioUpdateImagemPerfilCommandHandler = ICommandHandler<
  UsuarioUpdateImagemPerfilCommand,
  boolean
>;
