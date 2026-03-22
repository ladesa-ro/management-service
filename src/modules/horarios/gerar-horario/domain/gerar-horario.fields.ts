/**
 * Gerar Horario — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";
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

const idSchema = uuidSchema;
const dataInicioSchema = z.string().date();
const dataTerminoSchema = z.string().date().nullable();
const ofertaFormacaoIdsSchema = z.array(z.string().uuid());
const duracaoSchema = z.enum(GerarHorarioDuracaoValues);
const statusSchema = z.enum(GerarHorarioStatusValues);
const dateCreatedSchema = z.string().datetime();

export const GerarHorarioFields = {
  id: createFieldMetadata({
    description: "ID da solicitacao",
    schema: idSchema,
  }),
  dataInicio: createFieldMetadata({
    description: "Data inicio do periodo",
    schema: dataInicioSchema,
  }),
  dataTermino: createFieldMetadata({
    description: "Data termino do periodo",
    schema: dataTerminoSchema,
    nullable: true,
  }),
  ofertaFormacaoIds: createFieldMetadata({
    description: "IDs das ofertas de formacao",
    schema: ofertaFormacaoIdsSchema,
  }),
  duracao: createFieldMetadata({
    description: "Duracao: TEMPORARIO ou PERMANENTE",
    schema: duracaoSchema,
  }),
  status: createFieldMetadata({
    description: "Status da solicitacao de geracao de horario",
    schema: statusSchema,
  }),
  respostaGerador: createFieldMetadata({
    description: "Resposta do gerador de horario",
    nullable: true,
  }),
  dateCreated: createFieldMetadata({
    description: "Data de criacao da solicitacao",
    schema: dateCreatedSchema,
  }),
};
