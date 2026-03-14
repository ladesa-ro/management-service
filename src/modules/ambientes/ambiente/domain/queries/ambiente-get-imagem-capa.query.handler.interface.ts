import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";

export type IAmbienteGetImagemCapaQuery = {
  accessContext: AccessContext | null;
  id: string;
};

export type IAmbienteGetImagemCapaQueryHandler = IQueryHandler<
  IAmbienteGetImagemCapaQuery,
  StreamableFile
>;
export const IAmbienteGetImagemCapaQueryHandler = Symbol("IAmbienteGetImagemCapaQueryHandler");
