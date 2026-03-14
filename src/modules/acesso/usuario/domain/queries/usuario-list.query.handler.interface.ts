import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioListInputDto, UsuarioListOutputDto } from "../../application/dtos";

export type IUsuarioListQuery = {
  accessContext: AccessContext;
  dto: UsuarioListInputDto | null;
  selection?: string[] | boolean;
};

export type IUsuarioListQueryHandler = IQueryHandler<IUsuarioListQuery, UsuarioListOutputDto>;
export const IUsuarioListQueryHandler = Symbol("IUsuarioListQueryHandler");
