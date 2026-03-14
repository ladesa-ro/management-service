import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoCreateInputDto, BlocoFindOneOutputDto } from "../../application/dtos";

export type IBlocoCreateCommand = {
  accessContext: AccessContext;
  dto: BlocoCreateInputDto;
};

export type IBlocoCreateCommandHandler = ICommandHandler<
  IBlocoCreateCommand,
  BlocoFindOneOutputDto
>;
export const IBlocoCreateCommandHandler = Symbol("IBlocoCreateCommandHandler");
