import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/domain/abstractions";
import type { DisciplinaFindOneQuery } from "./disciplina-find-one.query";

export const IDisciplinaGetImagemCapaQueryHandler = Symbol("IDisciplinaGetImagemCapaQueryHandler");

export type IDisciplinaGetImagemCapaQueryHandler = IQueryHandler<
  DisciplinaFindOneQuery,
  StreamableFile
>;
