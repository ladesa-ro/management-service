import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneInputDto } from "../../application/dtos";

export type IBlocoDeleteCommand = {
  accessContext: AccessContext;
  dto: BlocoFindOneInputDto;
};

export type IBlocoDeleteCommandHandler = ICommandHandler<IBlocoDeleteCommand, boolean>;
export const IBlocoDeleteCommandHandler = Symbol("IBlocoDeleteCommandHandler");
