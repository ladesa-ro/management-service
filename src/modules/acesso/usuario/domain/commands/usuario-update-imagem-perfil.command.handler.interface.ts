import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";
export type IUsuarioUpdateImagemPerfilCommand = {
  accessContext: AccessContext;
  dto: UsuarioFindOneQuery;
  file: Express.Multer.File;
};

export type IUsuarioUpdateImagemPerfilCommandHandler = ICommandHandler<
  IUsuarioUpdateImagemPerfilCommand,
  boolean
>;
export const IUsuarioUpdateImagemPerfilCommandHandler = Symbol(
  "IUsuarioUpdateImagemPerfilCommandHandler",
);
