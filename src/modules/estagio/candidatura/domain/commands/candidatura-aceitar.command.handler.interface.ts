import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IMinhasCandidaturasItem } from "../repositories/estagio-candidatura.repository.interface";
import type { CandidaturaAceitarCommand } from "./candidatura-aceitar.command";

export const CandidaturaAceitarCommandMetadata = createOperationMetadata({
  operationId: "estagioCandidaturaAceitar",
  summary: "Aceita formalmente a oferta de vaga de estágio",
  description:
    "Operação atômica e com bloqueio concorrencial. O candidato aceita a vaga ofertada (OFFERED). Vincula o aluno ao estágio e altera seu status para EM_FASE_INICIAL.",
});

export const ICandidaturaAceitarCommandHandler = Symbol("ICandidaturaAceitarCommandHandler");

export type ICandidaturaAceitarCommandHandler = ICommandHandler<
  CandidaturaAceitarCommand,
  IMinhasCandidaturasItem
>;
