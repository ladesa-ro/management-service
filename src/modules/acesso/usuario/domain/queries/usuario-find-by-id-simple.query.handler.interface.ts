import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneInputDto, UsuarioFindOneOutputDto } from "../../application/dtos";

export type IUsuarioFindByIdSimpleQuery = {
  accessContext: AccessContext;
  id: UsuarioFindOneInputDto["id"];
  selection?: string[];
};

export type IUsuarioFindByIdSimpleQueryHandler = IQueryHandler<
  IUsuarioFindByIdSimpleQuery,
  UsuarioFindOneOutputDto | null
>;
export const IUsuarioFindByIdSimpleQueryHandler = Symbol("IUsuarioFindByIdSimpleQueryHandler");
