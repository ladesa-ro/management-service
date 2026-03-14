import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { TurmaDisponibilidadeFindOneInputDto } from "../../application/dtos";

export type ITurmaDisponibilidadeDeleteCommand = {
  accessContext: AccessContext;
  dto: TurmaDisponibilidadeFindOneInputDto;
};

export type ITurmaDisponibilidadeDeleteCommandHandler = ICommandHandler<
  ITurmaDisponibilidadeDeleteCommand,
  boolean
>;
export const ITurmaDisponibilidadeDeleteCommandHandler = Symbol(
  "ITurmaDisponibilidadeDeleteCommandHandler",
);
