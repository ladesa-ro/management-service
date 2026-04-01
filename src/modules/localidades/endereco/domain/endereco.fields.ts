/**
 * Endereco — definicao dos campos (FieldMetadata).
 */
import { z } from "zod";
import { createFieldMetadata } from "@/domain/abstractions";

export const EnderecoFields = {
  cep: createFieldMetadata({ description: "CEP", schema: z.string() }),
  logradouro: createFieldMetadata({ description: "Logradouro", schema: z.string() }),
  numero: createFieldMetadata({ description: "Numero", schema: z.number().int() }),
  bairro: createFieldMetadata({ description: "Bairro", schema: z.string() }),
  complemento: createFieldMetadata({
    description: "Complemento",
    schema: z.string().nullable(),
    nullable: true,
  }),
  pontoReferencia: createFieldMetadata({
    description: "Ponto de referencia",
    schema: z.string().nullable(),
    nullable: true,
  }),
  cidade: createFieldMetadata({ description: "Cidade" }),
};
