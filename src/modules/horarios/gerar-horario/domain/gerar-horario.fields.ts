/**
 * Gerar Horario — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";
import { uuidSchema } from "@/shared/validation/schemas";

export const GerarHorarioDuracaoValues = ["TEMPORARIO", "PERMANENTE"] as const;
export const GerarHorarioStatusValues = [
  "SOLICITADO",
  "PENDENTE",
  "SUCESSO",
  "ERRO",
  "ACEITO",
  "REJEITADO",
] as const;

export const GerarHorarioFields = {
  id: createFieldMetadata({
    description: "ID da solicitacao",
    schema: createSchema(() => uuidSchema),
  }),
  dataInicio: createFieldMetadata({
    description: "Data inicio do periodo",
    schema: createSchema(() => z.string().date()),
  }),
  dataTermino: createFieldMetadata({
    description: "Data termino do periodo",
    schema: createSchema(() => z.string().date().nullable()),
    nullable: true,
  }),
  ofertaFormacaoIds: createFieldMetadata({
    description: "IDs das ofertas de formacao",
    schema: createSchema(() => z.array(z.string().uuid())),
  }),
  calendarioLetivoIds: createFieldMetadata({
    description: "IDs dos calendarios letivos",
    schema: createSchema(() => z.array(z.string().uuid())),
  }),
  duracao: createFieldMetadata({
    description: "Duracao: TEMPORARIO ou PERMANENTE",
    schema: createSchema(() => z.enum(GerarHorarioDuracaoValues)),
  }),
  status: createFieldMetadata({
    description: "Status da solicitacao de geracao de horario",
    schema: createSchema(() => z.enum(GerarHorarioStatusValues)),
  }),
  respostaGerador: createFieldMetadata({
    description: "Resposta do gerador de horario",
    nullable: true,
  }),
  dateCreated: createFieldMetadata({
    description: "Data de criacao da solicitacao",
    schema: createSchema(() => z.string().datetime()),
  }),
};
