import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EtapaCreateInputDto, EtapaFindOneOutputDto } from "../../application/dtos";

export type IEtapaCreateCommand = {
  accessContext: AccessContext;
  dto: EtapaCreateInputDto;
};

export type IEtapaCreateCommandHandler = ICommandHandler<
  IEtapaCreateCommand,
  EtapaFindOneOutputDto
>;
export const IEtapaCreateCommandHandler = Symbol("IEtapaCreateCommandHandler");
