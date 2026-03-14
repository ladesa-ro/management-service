import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  TurmaDisponibilidadeFindOneInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
  TurmaDisponibilidadeUpdateInputDto,
} from "../../application/dtos";

export type ITurmaDisponibilidadeUpdateCommand = {
  accessContext: AccessContext;
  dto: TurmaDisponibilidadeFindOneInputDto & TurmaDisponibilidadeUpdateInputDto;
};

export type ITurmaDisponibilidadeUpdateCommandHandler = ICommandHandler<
  ITurmaDisponibilidadeUpdateCommand,
  TurmaDisponibilidadeFindOneOutputDto
>;
export const ITurmaDisponibilidadeUpdateCommandHandler = Symbol(
  "ITurmaDisponibilidadeUpdateCommandHandler",
);
