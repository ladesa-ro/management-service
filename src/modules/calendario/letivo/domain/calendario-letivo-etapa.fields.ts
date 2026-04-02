/**
 * CalendarioLetivoEtapa — definicao dos campos (FieldMetadata).
 */
import { z } from "zod";
import { createFieldMetadata, SharedFields } from "@/domain/abstractions";

export const CalendarioLetivoEtapaParamsFields = {
  calendarioLetivoId: createFieldMetadata({
    description: "ID do calendario letivo",
    schema: z.string().uuid(),
  }),
};

export const CalendarioLetivoEtapaBulkReplaceItemFields = {
  ofertaFormacaoPeriodoEtapaId: createFieldMetadata({
    description: "ID da etapa da oferta de formacao periodo",
    schema: z.string().uuid(),
  }),
  dataInicio: createFieldMetadata({
    description: "Data inicio da etapa",
    schema: z.string().date(),
  }),
  dataTermino: createFieldMetadata({
    description: "Data termino da etapa",
    schema: z.string().date(),
  }),
};

export const CalendarioLetivoEtapaOutputFields = {
  id: SharedFields.idUuid,
  ofertaFormacaoPeriodoEtapaId: createFieldMetadata({
    description: "ID da etapa da oferta de formacao periodo",
    schema: z.string(),
  }),
  nomeEtapa: createFieldMetadata({
    description: "Nome da etapa",
    schema: z.string(),
  }),
  dataInicio: createFieldMetadata({
    description: "Data inicio da etapa",
    schema: z.string().date(),
  }),
  dataTermino: createFieldMetadata({
    description: "Data termino da etapa",
    schema: z.string().date(),
  }),
};
