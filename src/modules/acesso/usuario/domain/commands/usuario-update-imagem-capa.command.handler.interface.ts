import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";
export type IUsuarioUpdateImagemCapaCommand = {
  accessContext: AccessContext;
  dto: UsuarioFindOneQuery;
  file: Express.Multer.File;
};

export type IUsuarioUpdateImagemCapaCommandHandler = ICommandHandler<
  IUsuarioUpdateImagemCapaCommand,
  boolean
>;
export const IUsuarioUpdateImagemCapaCommandHandler = Symbol(
  "IUsuarioUpdateImagemCapaCommandHandler",
);
