import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";

export type ICursoGetImagemCapaQuery = {
  accessContext: AccessContext | null;
  id: string;
};

export type ICursoGetImagemCapaQueryHandler = IQueryHandler<
  ICursoGetImagemCapaQuery,
  StreamableFile
>;
export const ICursoGetImagemCapaQueryHandler = Symbol("ICursoGetImagemCapaQueryHandler");
