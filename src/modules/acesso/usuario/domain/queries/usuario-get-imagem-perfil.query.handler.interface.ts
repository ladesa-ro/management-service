import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";

export const IUsuarioGetImagemPerfilQueryHandler = Symbol("IUsuarioGetImagemPerfilQueryHandler");

export type IUsuarioGetImagemPerfilQueryHandler = IQueryHandler<
  UsuarioFindOneQuery,
  StreamableFile
>;
