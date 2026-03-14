import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  EtapaFindOneInputDto,
  EtapaFindOneOutputDto,
  EtapaUpdateInputDto,
} from "../../application/dtos";

export type IEtapaUpdateCommand = {
  accessContext: AccessContext;
  dto: EtapaFindOneInputDto & EtapaUpdateInputDto;
};

export type IEtapaUpdateCommandHandler = ICommandHandler<
  IEtapaUpdateCommand,
  EtapaFindOneOutputDto
>;
export const IEtapaUpdateCommandHandler = Symbol("IEtapaUpdateCommandHandler");
