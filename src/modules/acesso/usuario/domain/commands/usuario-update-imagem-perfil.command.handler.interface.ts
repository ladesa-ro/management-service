import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";

export type UsuarioUpdateImagemPerfilCommand = {
  dto: UsuarioFindOneQuery;
  file: Express.Multer.File;
};

export type IUsuarioUpdateImagemPerfilCommandHandler = ICommandHandler<
  UsuarioUpdateImagemPerfilCommand,
  boolean
>;
export const IUsuarioUpdateImagemPerfilCommandHandler = Symbol(
  "IUsuarioUpdateImagemPerfilCommandHandler",
);
