import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";

export type UsuarioUpdateImagemCapaCommand = {
  dto: UsuarioFindOneQuery;
  file: Express.Multer.File;
};

export type IUsuarioUpdateImagemCapaCommandHandler = ICommandHandler<
  UsuarioUpdateImagemCapaCommand,
  boolean
>;
export const IUsuarioUpdateImagemCapaCommandHandler = Symbol(
  "IUsuarioUpdateImagemCapaCommandHandler",
);
