import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IMinhasCandidaturasItem } from "../repositories/estagio-candidatura.repository.interface";
import type { CandidaturaConvocarCommand } from "./candidatura-convocar.command";

export const CandidaturaConvocarCommandMetadata = createOperationMetadata({
  operationId: "estagioCandidaturaConvocar",
  summary: "Convoca candidato da fila de espera para ocupar a vaga",
  description:
    "Operação restrita ao CIEC e servidores autorizados. Transiciona a candidatura de PENDING para OFFERED com prazo de expiração determinado.",
});

export const ICandidaturaConvocarCommandHandler = Symbol("ICandidaturaConvocarCommandHandler");

export type ICandidaturaConvocarCommandHandler = ICommandHandler<
  CandidaturaConvocarCommand,
  IMinhasCandidaturasItem
>;
