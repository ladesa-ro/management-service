import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioCreateInputDto, EstagiarioFindOneOutputDto } from "../../application/dtos";

export type IEstagiarioCreateCommand = {
  accessContext: AccessContext;
  dto: EstagiarioCreateInputDto;
};

export type IEstagiarioCreateCommandHandler = ICommandHandler<
  IEstagiarioCreateCommand,
  EstagiarioFindOneOutputDto
>;
export const IEstagiarioCreateCommandHandler = Symbol("IEstagiarioCreateCommandHandler");
