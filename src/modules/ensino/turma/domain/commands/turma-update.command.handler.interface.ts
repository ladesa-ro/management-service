import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaUpdateInputDto,
} from "../../application/dtos";

export type ITurmaUpdateCommand = {
  accessContext: AccessContext;
  dto: TurmaFindOneInputDto & TurmaUpdateInputDto;
};

export type ITurmaUpdateCommandHandler = ICommandHandler<
  ITurmaUpdateCommand,
  TurmaFindOneOutputDto
>;
export const ITurmaUpdateCommandHandler = Symbol("ITurmaUpdateCommandHandler");
