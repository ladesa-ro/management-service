import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioUpdateInputDto,
} from "../../application/dtos";

export type IUsuarioUpdateCommand = {
  accessContext: AccessContext;
  dto: UsuarioFindOneInputDto & UsuarioUpdateInputDto;
};

export type IUsuarioUpdateCommandHandler = ICommandHandler<
  IUsuarioUpdateCommand,
  UsuarioFindOneOutputDto
>;
export const IUsuarioUpdateCommandHandler = Symbol("IUsuarioUpdateCommandHandler");
