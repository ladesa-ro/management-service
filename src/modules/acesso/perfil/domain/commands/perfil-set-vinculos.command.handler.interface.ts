import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { PerfilListOutputDto, PerfilSetVinculosInputDto } from "../../application/dtos";

export type IPerfilSetVinculosCommand = {
  accessContext: AccessContext;
  dto: PerfilSetVinculosInputDto;
};

export type IPerfilSetVinculosCommandHandler = ICommandHandler<
  IPerfilSetVinculosCommand,
  PerfilListOutputDto
>;
export const IPerfilSetVinculosCommandHandler = Symbol("IPerfilSetVinculosCommandHandler");
