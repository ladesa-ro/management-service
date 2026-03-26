/**
 * Estagio — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema, safeInt } from "@/domain/abstractions";

export const EstagioStatusValues = ["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"] as const;

export const EstagioStatusSchema = z.enum(EstagioStatusValues);

export const EstagioFields = {
  empresa: createFieldMetadata({
    description: "Empresa do estágio",
  }),
  estagiario: createFieldMetadata({
    description: "Estagiário (opcional enquanto a vaga estiver aberta)",
    nullable: true,
  }),
  cargaHoraria: createFieldMetadata({
    description: "Carga horária semanal",
    schema: createSchema((standard) => safeInt(standard, (s) => s.min(1))),
  }),
  dataInicio: createFieldMetadata({
    description: "Data de início do estágio",
    schema: createSchema(() => z.string().date()),
    nullable: true,
  }),
  dataFim: createFieldMetadata({
    description: "Data de fim do estágio",
    schema: createSchema(() => z.string().date().nullable()),
    nullable: true,
  }),
  status: createFieldMetadata({
    description: "Status do estágio",
    schema: createSchema(() => EstagioStatusSchema),
  }),
  horariosEstagio: createFieldMetadata({
    description: "Horários do estágio",
  }),
  ativo: createFieldMetadata({
    description: "Se o estágio está ativo",
  }),
};
