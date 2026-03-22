import type { ICommandHandler } from "@/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";

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
