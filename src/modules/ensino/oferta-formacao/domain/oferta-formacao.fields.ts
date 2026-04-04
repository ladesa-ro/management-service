/**
 * Oferta Formacao — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, schema zod (quando aplicavel) e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import {
  createFieldMetadata,
  createSchema,
  ObjectIdUuidFactory,
  safeInt,
} from "@/domain/abstractions";

export const OfertaFormacaoFields = {
  nome: createFieldMetadata({
    description: "Nome da oferta de formacao",
    schema: createSchema(() => z.string().min(1, "nome é obrigatório")),
  }),
  slug: createFieldMetadata({
    description: "Apelido da oferta de formacao",
    schema: createSchema(() => z.string().min(1, "slug é obrigatório")),
  }),
  duracaoPeriodoEmMeses: createFieldMetadata({
    description: "Duracao de cada periodo em meses",
    schema: createSchema((standard) => safeInt(standard, (s) => s.positive())),
  }),
  modalidade: createFieldMetadata({
    description: "Modalidade da oferta de formacao",
    schema: ObjectIdUuidFactory,
  }),
  campus: createFieldMetadata({
    description: "Campus da oferta de formacao",
    schema: ObjectIdUuidFactory,
  }),
  niveisFormacoes: createFieldMetadata({
    description: "Niveis de formacao vinculados a oferta de formacao",
    schema: ObjectIdUuidFactory,
  }),
  periodos: createFieldMetadata({
    description: "Periodos com suas etapas do ano letivo",
  }),
  imagemCapa: createFieldMetadata({
    description: "Imagem de capa da oferta de formacao",
    nullable: true,
  }),
};
