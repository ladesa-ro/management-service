import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaDisponibilidadeDeactivateCommand } from "./turma-disponibilidade-deactivate.command";

export const TurmaDisponibilidadeDeactivateCommandMetadata = createOperationMetadata({
  operationId: "turmaDisponibilidadeDeactivate",
  summary: "Desativa uma configuracao de disponibilidade da turma",
});

export const ITurmaDisponibilidadeDeactivateCommandHandler = Symbol(
  "ITurmaDisponibilidadeDeactivateCommandHandler",
);

export type ITurmaDisponibilidadeDeactivateCommandHandler = ICommandHandler<
  TurmaDisponibilidadeDeactivateCommand,
  void
>;
