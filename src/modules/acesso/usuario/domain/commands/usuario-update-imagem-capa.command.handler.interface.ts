import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";

export const UsuarioUpdateImagemCapaCommandMetadata = createOperationMetadata({
  operationId: "usuarioUpdateImagemCapa",
  summary: "Define imagem de capa de um usuario",
});

export type UsuarioUpdateImagemCapaCommand = {
  dto: UsuarioFindOneQuery;
  file: Express.Multer.File;
};

export const IUsuarioUpdateImagemCapaCommandHandler = Symbol(
  "IUsuarioUpdateImagemCapaCommandHandler",
);

export type IUsuarioUpdateImagemCapaCommandHandler = ICommandHandler<
  UsuarioUpdateImagemCapaCommand,
  boolean
>;
