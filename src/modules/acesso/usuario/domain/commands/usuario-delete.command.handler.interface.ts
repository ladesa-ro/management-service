import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneInputDto } from "../../application/dtos";

export type IUsuarioDeleteCommand = {
  accessContext: AccessContext;
  dto: UsuarioFindOneInputDto;
};

export type IUsuarioDeleteCommandHandler = ICommandHandler<IUsuarioDeleteCommand, boolean>;
export const IUsuarioDeleteCommandHandler = Symbol("IUsuarioDeleteCommandHandler");
