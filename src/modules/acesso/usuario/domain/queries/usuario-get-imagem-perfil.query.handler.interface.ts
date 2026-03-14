import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";

export type IUsuarioGetImagemPerfilQuery = {
  accessContext: AccessContext | null;
  id: string;
};

export type IUsuarioGetImagemPerfilQueryHandler = IQueryHandler<
  IUsuarioGetImagemPerfilQuery,
  StreamableFile
>;
export const IUsuarioGetImagemPerfilQueryHandler = Symbol("IUsuarioGetImagemPerfilQueryHandler");
