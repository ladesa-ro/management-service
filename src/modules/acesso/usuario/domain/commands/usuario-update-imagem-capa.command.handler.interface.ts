import type { ICommandHandler } from "@/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";

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
