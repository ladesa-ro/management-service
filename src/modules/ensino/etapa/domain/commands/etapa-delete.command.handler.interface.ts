import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EtapaFindOneInputDto } from "../../application/dtos";

export type IEtapaDeleteCommand = {
  accessContext: AccessContext;
  dto: EtapaFindOneInputDto;
};

export type IEtapaDeleteCommandHandler = ICommandHandler<IEtapaDeleteCommand, boolean>;
export const IEtapaDeleteCommandHandler = Symbol("IEtapaDeleteCommandHandler");
