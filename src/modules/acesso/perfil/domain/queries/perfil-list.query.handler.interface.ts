import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { PerfilListInputDto, PerfilListOutputDto } from "../../application/dtos";

export type IPerfilListQuery = {
  accessContext: AccessContext;
  dto: PerfilListInputDto | null;
  selection?: string[] | boolean;
};

export type IPerfilListQueryHandler = IQueryHandler<IPerfilListQuery, PerfilListOutputDto>;
export const IPerfilListQueryHandler = Symbol("IPerfilListQueryHandler");
