import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";

export type IBlocoGetImagemCapaQuery = {
  accessContext: AccessContext | null;
  id: string;
};

export type IBlocoGetImagemCapaQueryHandler = IQueryHandler<
  IBlocoGetImagemCapaQuery,
  StreamableFile
>;
export const IBlocoGetImagemCapaQueryHandler = Symbol("IBlocoGetImagemCapaQueryHandler");
