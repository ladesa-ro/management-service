import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaCreateInputDto, TurmaFindOneOutputDto } from "../../application/dtos";

export type ITurmaCreateCommand = {
  accessContext: AccessContext;
  dto: TurmaCreateInputDto;
};

export type ITurmaCreateCommandHandler = ICommandHandler<
  ITurmaCreateCommand,
  TurmaFindOneOutputDto
>;
export const ITurmaCreateCommandHandler = Symbol("ITurmaCreateCommandHandler");
