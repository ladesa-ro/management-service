/**
 * Diario Preferencia Agrupamento — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema, safeInt } from "@/domain/abstractions";

export const DiarioPreferenciaAgrupamentoModoValues = ["DEFINIDO", "POR_DIA_SEMANA"] as const;
export type DiarioPreferenciaAgrupamentoModo =
  (typeof DiarioPreferenciaAgrupamentoModoValues)[number];

export const DiarioPreferenciaAgrupamentoFields = {
  modo: createFieldMetadata({
    description:
      "Modo da preferencia: DEFINIDO (ordem generica) ou POR_DIA_SEMANA (dia da semana ISO)",
    schema: createSchema(() => z.enum(DiarioPreferenciaAgrupamentoModoValues)),
  }),
  ordem: createFieldMetadata({
    description: "Ordem sequencial do agrupamento (usado no modo DEFINIDO)",
    schema: createSchema((standard) => safeInt(standard, (s) => s.min(1, "ordem deve ser >= 1"))),
  }),
  dataInicio: createFieldMetadata({
    description: "Inicio da vigencia da preferencia de agrupamento",
    schema: createSchema(() => z.string().min(1, "dataInicio é obrigatória")),
  }),
  dataFim: createFieldMetadata({
    description: "Fim da vigencia da preferencia de agrupamento",
    schema: createSchema(() => z.string().nullable().optional()),
    nullable: true,
  }),
  diaSemanaIso: createFieldMetadata({
    description:
      "Dia da semana (ISO 8601: 1=Segunda, 7=Domingo). Obrigatorio no modo POR_DIA_SEMANA, null no modo DEFINIDO.",
    schema: createSchema((standard) =>
      safeInt(standard, (s) =>
        s.min(1, "diaSemanaIso deve ser >= 1").max(7, "diaSemanaIso deve ser <= 7"),
      ).nullable(),
    ),
    nullable: true,
  }),
  aulasSeguidas: createFieldMetadata({
    description: "Quantidade de aulas seguidas",
    schema: createSchema((standard) =>
      safeInt(standard, (s) => s.min(1, "aulasSeguidas deve ser >= 1")),
    ),
  }),
  diario: createFieldMetadata({
    description: "Diario vinculado",
  }),
};
