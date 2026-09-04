import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { IMinhasCandidaturasItem } from "../repositories/estagio-candidatura.repository.interface";
import type { CandidaturaCreateCommand } from "./candidatura-create.command";

export const CandidaturaCreateCommandMetadata = createOperationMetadata({
  operationId: "estagioCandidaturaCreate",
  summary: "Candidata o aluno autenticado a uma vaga disponível",
  description:
    "Inscreve o aluno autenticado na lista de espera da vaga especificada. Identifica o candidato exclusivamente via token JWT.",
});

export const ICandidaturaCreateCommandHandler = Symbol("ICandidaturaCreateCommandHandler");

export type ICandidaturaCreateCommandHandler = ICommandHandler<
  CandidaturaCreateCommand,
  IMinhasCandidaturasItem
>;
