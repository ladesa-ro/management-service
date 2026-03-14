import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioFindOneOutputDto, EstagiarioUpdateInputDto } from "../../application/dtos";

export type IEstagiarioUpdateCommand = {
  accessContext: AccessContext;
  id: string;
  dto: EstagiarioUpdateInputDto;
};

export type IEstagiarioUpdateCommandHandler = ICommandHandler<
  IEstagiarioUpdateCommand,
  EstagiarioFindOneOutputDto
>;
export const IEstagiarioUpdateCommandHandler = Symbol("IEstagiarioUpdateCommandHandler");
