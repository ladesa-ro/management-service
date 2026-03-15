import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQuery } from "./ambiente-find-one.query";

export type IAmbienteGetImagemCapaQueryHandler = IQueryHandler<
  AmbienteFindOneQuery,
  StreamableFile
>;
export const IAmbienteGetImagemCapaQueryHandler = Symbol("IAmbienteGetImagemCapaQueryHandler");
