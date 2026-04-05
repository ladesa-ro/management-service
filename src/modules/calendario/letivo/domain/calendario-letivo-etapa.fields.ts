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

export const CalendarioLetivoEtapaSnapshotFields = {
  nome: createFieldMetadata({
    description: "Nome da etapa (snapshot)",
    schema: z.string(),
  }),
  cor: createFieldMetadata({
    description: "Cor da etapa para exibicao (snapshot)",
    schema: z.string(),
  }),
  ordem: createFieldMetadata({
    description: "Ordem da etapa (snapshot)",
    schema: z.number().int(),
  }),
  numeroPeriodo: createFieldMetadata({
    description: "Numero do periodo da etapa (snapshot)",
    schema: z.number().int(),
  }),
};

export const CalendarioLetivoEtapaVersionedFields = {
  identificadorExterno: createFieldMetadata({
    description: "Identificador externo para versionamento",
    schema: z.string().uuid(),
  }),
  version: createFieldMetadata({
    description: "Numero da versao",
    schema: z.number().int().min(1),
  }),
  previousVersionId: createFieldMetadata({
    description: "ID da versao anterior",
    schema: z.string().uuid().nullable(),
  }),
  validFrom: createFieldMetadata({
    description: "Data de inicio de validade da versao",
    schema: z.string().datetime(),
  }),
  validTo: createFieldMetadata({
    description: "Data de termino de validade da versao",
    schema: z.string().datetime().nullable(),
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
  ...CalendarioLetivoEtapaSnapshotFields,
  ...CalendarioLetivoEtapaVersionedFields,
};
