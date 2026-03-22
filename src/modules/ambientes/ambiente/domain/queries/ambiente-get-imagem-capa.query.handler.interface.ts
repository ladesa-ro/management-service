import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/domain/abstractions";
import type { AmbienteFindOneQuery } from "./ambiente-find-one.query";

export const IAmbienteGetImagemCapaQueryHandler = Symbol("IAmbienteGetImagemCapaQueryHandler");

export type IAmbienteGetImagemCapaQueryHandler = IQueryHandler<
  AmbienteFindOneQuery,
  StreamableFile
>;
