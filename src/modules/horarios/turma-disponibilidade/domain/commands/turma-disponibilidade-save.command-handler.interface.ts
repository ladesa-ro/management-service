import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { TurmaDisponibilidadeConfiguracao } from "../turma-disponibilidade";
import type { TurmaDisponibilidadeSaveCommand } from "./turma-disponibilidade-save.command";

export const TurmaDisponibilidadeSaveCommandMetadata = createOperationMetadata({
  operationId: "turmaDisponibilidadeSave",
  summary: "Define disponibilidade da turma",
});

export const ITurmaDisponibilidadeSaveCommandHandler = Symbol(
  "ITurmaDisponibilidadeSaveCommandHandler",
);

export type ITurmaDisponibilidadeSaveCommandHandler = ICommandHandler<
  TurmaDisponibilidadeSaveCommand,
  TurmaDisponibilidadeConfiguracao[]
>;
