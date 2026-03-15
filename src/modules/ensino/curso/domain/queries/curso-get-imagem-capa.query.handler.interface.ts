import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoFindOneQuery } from "./curso-find-one.query";

export type ICursoGetImagemCapaQueryHandler = IQueryHandler<CursoFindOneQuery, StreamableFile>;
export const ICursoGetImagemCapaQueryHandler = Symbol("ICursoGetImagemCapaQueryHandler");
