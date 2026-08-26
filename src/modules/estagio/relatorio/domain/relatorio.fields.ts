/**
 * Relatorio — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { createFieldMetadata } from "@/domain/abstractions";

export const RelatorioFields = {
  estagio: createFieldMetadata({
    description: "Estágio ao qual o relatório pertence",
  }),
  arquivo: createFieldMetadata({
    description: "Arquivo PDF do relatório de estágio",
    nullable: true,
  }),
  conteudoJson: createFieldMetadata({
    description: "Conteúdo adicional do relatório em formato JSON",
    nullable: true,
  }),
};
