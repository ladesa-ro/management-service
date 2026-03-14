import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";

export type IUsuarioGetImagemCapaQuery = {
  accessContext: AccessContext | null;
  id: string;
};

export type IUsuarioGetImagemCapaQueryHandler = IQueryHandler<
  IUsuarioGetImagemCapaQuery,
  StreamableFile
>;
export const IUsuarioGetImagemCapaQueryHandler = Symbol("IUsuarioGetImagemCapaQueryHandler");
