import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CandidaturaCancelarCommand } from "./candidatura-cancelar.command";

export const CandidaturaCancelarCommandMetadata = createOperationMetadata({
  operationId: "estagioCandidaturaCancelar",
  summary: "Cancela a candidatura do aluno autenticado",
  description:
    "Permite que o aluno cancele sua própria candidatura em lista de espera (PENDING) ou convocação (OFFERED). Retorna 404 caso a candidatura pertença a outro aluno.",
});

export const ICandidaturaCancelarCommandHandler = Symbol("ICandidaturaCancelarCommandHandler");

export type ICandidaturaCancelarCommandHandler = ICommandHandler<
  CandidaturaCancelarCommand,
  boolean
>;
