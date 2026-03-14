import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneInputDto, UsuarioFindOneOutputDto } from "../../application/dtos";

export type IUsuarioFindOneQuery = {
  accessContext: AccessContext | null;
  dto: UsuarioFindOneInputDto;
  selection?: string[] | boolean;
};

export type IUsuarioFindOneQueryHandler = IQueryHandler<
  IUsuarioFindOneQuery,
  UsuarioFindOneOutputDto | null
>;
export const IUsuarioFindOneQueryHandler = Symbol("IUsuarioFindOneQueryHandler");
