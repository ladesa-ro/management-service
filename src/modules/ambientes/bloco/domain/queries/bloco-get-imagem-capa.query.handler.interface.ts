import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/domain/abstractions";
import type { BlocoFindOneQuery } from "./bloco-find-one.query";

export const IBlocoGetImagemCapaQueryHandler = Symbol("IBlocoGetImagemCapaQueryHandler");

export type IBlocoGetImagemCapaQueryHandler = IQueryHandler<BlocoFindOneQuery, StreamableFile>;
