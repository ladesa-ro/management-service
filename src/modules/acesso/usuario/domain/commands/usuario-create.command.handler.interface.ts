import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioCreateInputDto, UsuarioFindOneOutputDto } from "../../application/dtos";

export type IUsuarioCreateCommand = {
  accessContext: AccessContext;
  dto: UsuarioCreateInputDto;
};

export type IUsuarioCreateCommandHandler = ICommandHandler<
  IUsuarioCreateCommand,
  UsuarioFindOneOutputDto
>;
export const IUsuarioCreateCommandHandler = Symbol("IUsuarioCreateCommandHandler");
