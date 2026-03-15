import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DisciplinaFindOneQuery } from "./disciplina-find-one.query";

export type IDisciplinaGetImagemCapaQueryHandler = IQueryHandler<
  DisciplinaFindOneQuery,
  StreamableFile
>;
export const IDisciplinaGetImagemCapaQueryHandler = Symbol("IDisciplinaGetImagemCapaQueryHandler");
