/**
 * OfertaFormacaoPeriodo/Etapa — definicao dos campos (FieldMetadata).
 */
import { z } from "zod";
import { createFieldMetadata, SharedFields } from "@/domain/abstractions";

export const OfertaFormacaoPeriodoEtapaFields = {
  id: SharedFields.idUuid,
  nome: createFieldMetadata({
    description: "Nome da etapa",
    schema: z.string(),
  }),
  cor: createFieldMetadata({
    description: "Cor da etapa (hex)",
    schema: z.string(),
  }),
};

export const OfertaFormacaoPeriodoFields = {
  id: SharedFields.idUuid,
  numeroPeriodo: createFieldMetadata({
    description: "Numero do periodo",
    schema: z.number().int().min(1),
  }),
  etapas: createFieldMetadata({
    description: "Etapas do periodo (ao menos 1)",
  }),
};
