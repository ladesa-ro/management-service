import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { PerfilFindOneOutputDto } from "../../application/dtos";

export type IPerfilFindAllActiveQuery = {
  accessContext: AccessContext | null;
  usuarioId: string;
};

export type IPerfilFindAllActiveQueryHandler = IQueryHandler<
  IPerfilFindAllActiveQuery,
  PerfilFindOneOutputDto[]
>;
export const IPerfilFindAllActiveQueryHandler = Symbol("IPerfilFindAllActiveQueryHandler");
