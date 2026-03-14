import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioEnsinoOutput, UsuarioFindOneInputDto } from "../../application/dtos";

export type IUsuarioEnsinoQuery = {
  accessContext: AccessContext | null;
  dto: UsuarioFindOneInputDto;
  selection?: string[] | boolean;
};

export type IUsuarioEnsinoQueryHandler = IQueryHandler<IUsuarioEnsinoQuery, UsuarioEnsinoOutput>;
export const IUsuarioEnsinoQueryHandler = Symbol("IUsuarioEnsinoQueryHandler");
