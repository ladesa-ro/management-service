import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";

export type ITurmaGetImagemCapaQuery = {
  accessContext: AccessContext | null;
  id: string;
};

export type ITurmaGetImagemCapaQueryHandler = IQueryHandler<
  ITurmaGetImagemCapaQuery,
  StreamableFile
>;
export const ITurmaGetImagemCapaQueryHandler = Symbol("ITurmaGetImagemCapaQueryHandler");
