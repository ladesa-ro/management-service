import { z } from "zod";
import { createFieldMetadata, createSchema, safeInt } from "@/domain/abstractions";

export const EstagioCandidaturaSituacaoValues = [
  "PENDING",
  "OFFERED",
  "ACCEPTED",
  "REJECTED",
  "CANCELLED",
  "EXPIRED",
] as const;

export type EstagioCandidaturaSituacao = (typeof EstagioCandidaturaSituacaoValues)[number];

export const EstagioCandidaturaSituacaoSchema = z.enum(EstagioCandidaturaSituacaoValues);

export const EstagioCandidaturaFields = {
  id: createFieldMetadata({
    description: "Identificador único da candidatura (UUID)",
  }),
  estagio: createFieldMetadata({
    description: "Vaga de estágio à qual o aluno se candidatou",
  }),
  estagiario: createFieldMetadata({
    description: "Estagiário candidato",
  }),
  situacao: createFieldMetadata({
    description: "Situação da candidatura na fila ou processo seletivo",
    schema: createSchema(() => EstagioCandidaturaSituacaoSchema),
  }),
  posicaoFila: createFieldMetadata({
    description: "Posição calculada dinamicamente na lista de espera (1 para o primeiro da fila)",
    schema: createSchema((standard) => safeInt(standard, (s) => s.min(1))),
    nullable: true,
  }),
  dataInscricao: createFieldMetadata({
    description: "Data e hora em que a candidatura foi submetida",
    schema: createSchema(() => z.string()),
  }),
  dataOferta: createFieldMetadata({
    description: "Data e hora em que a convocação/oferta foi emitida pelo CIEC",
    schema: createSchema(() => z.string().nullable()),
    nullable: true,
  }),
  expiraEm: createFieldMetadata({
    description: "Data e hora de expiração do prazo de resposta da oferta",
    schema: createSchema(() => z.string().nullable()),
    nullable: true,
  }),
  dataResposta: createFieldMetadata({
    description: "Data e hora do aceite ou recusa pelo candidato",
    schema: createSchema(() => z.string().nullable()),
    nullable: true,
  }),
  dataCancelamento: createFieldMetadata({
    description: "Data e hora do cancelamento pelo próprio candidato",
    schema: createSchema(() => z.string().nullable()),
    nullable: true,
  }),
  autorConvocacao: createFieldMetadata({
    description: "Servidor / CIEC responsável pela convocação",
    nullable: true,
  }),
  motivoCancelamento: createFieldMetadata({
    description: "Justificativa informada ao cancelar a candidatura",
    schema: createSchema(() => z.string().max(1000).nullable()),
    nullable: true,
  }),
  acaoDisponivel: createFieldMetadata({
    description: "Indica se o aluno pode realizar uma ação no momento (ex: aceitar a oferta)",
    schema: createSchema(() => z.boolean()),
  }),
};
