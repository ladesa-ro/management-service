import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaFindOneQuery } from "./turma-find-one.query";

export type ITurmaGetImagemCapaQueryHandler = IQueryHandler<TurmaFindOneQuery, StreamableFile>;
export const ITurmaGetImagemCapaQueryHandler = Symbol("ITurmaGetImagemCapaQueryHandler");
