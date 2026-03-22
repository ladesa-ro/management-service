import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/domain/abstractions";
import type { TurmaFindOneQuery } from "./turma-find-one.query";

export const ITurmaGetImagemCapaQueryHandler = Symbol("ITurmaGetImagemCapaQueryHandler");

export type ITurmaGetImagemCapaQueryHandler = IQueryHandler<TurmaFindOneQuery, StreamableFile>;
