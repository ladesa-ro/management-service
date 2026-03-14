import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneInputDto } from "../../application/dtos";

export type IUsuarioUpdateImagemPerfilCommand = {
  accessContext: AccessContext;
  dto: UsuarioFindOneInputDto;
  file: Express.Multer.File;
};

export type IUsuarioUpdateImagemPerfilCommandHandler = ICommandHandler<
  IUsuarioUpdateImagemPerfilCommand,
  boolean
>;
export const IUsuarioUpdateImagemPerfilCommandHandler = Symbol(
  "IUsuarioUpdateImagemPerfilCommandHandler",
);
