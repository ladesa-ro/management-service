import type { StreamableFile } from "@nestjs/common";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "./usuario-find-one.query";

export type IUsuarioGetImagemCapaQueryHandler = IQueryHandler<UsuarioFindOneQuery, StreamableFile>;
export const IUsuarioGetImagemCapaQueryHandler = Symbol("IUsuarioGetImagemCapaQueryHandler");
