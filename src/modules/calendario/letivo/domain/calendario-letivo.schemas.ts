/**
 * Calendario Letivo — schemas zod para a entidade e suas operacoes.
 *
 * Contem os schemas de referencia, composicao (create/update)
 * e validacao da entidade. Fonte unica de verdade (SSOT) para
 * os contratos de dados da entidade.
 */
import { z } from "zod";
import {
  createSchema,
  ObjectIdUuidFactory,
  ObjectIdUuidFactoryNullable,
} from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CalendarioLetivoFields, CalendarioLetivoSituacaoSchema } from "./calendario-letivo.fields";
import { CalendarioLetivoEtapaBulkReplaceItemFields } from "./calendario-letivo-etapa.fields";

// ============================================================================
// Fragments de referência
// ============================================================================

export const CalendarioLetivoCampusRefSchema = ObjectIdUuidFactory;

export const CalendarioLetivoOfertaFormacaoRefSchema = ObjectIdUuidFactory;

// ============================================================================
// Schemas compostos
// ============================================================================

export const CalendarioLetivoSchema = z
  .object({
    id: uuidSchema,
    nome: CalendarioLetivoFields.nome.domainSchema,
    ano: CalendarioLetivoFields.ano.domainSchema,
    campus: ObjectIdUuidFactory.domain,
    ofertaFormacao: ObjectIdUuidFactoryNullable.domain,
    situacao: CalendarioLetivoSituacaoSchema,
  })
  .extend(datedSchema.shape);

const CalendarioLetivoEtapaInputItemSchema = z.object({
  ofertaFormacaoPeriodoEtapaId:
    CalendarioLetivoEtapaBulkReplaceItemFields.ofertaFormacaoPeriodoEtapaId.domainSchema,
  dataInicio: CalendarioLetivoEtapaBulkReplaceItemFields.dataInicio.domainSchema,
  dataTermino: CalendarioLetivoEtapaBulkReplaceItemFields.dataTermino.domainSchema,
});

export const CalendarioLetivoCreateSchema = createSchema((standard) =>
  z.object({
    nome: CalendarioLetivoFields.nome.create(standard),
    ano: CalendarioLetivoFields.ano.create(standard),
    campus: CalendarioLetivoCampusRefSchema.create(standard),
    ofertaFormacao: CalendarioLetivoOfertaFormacaoRefSchema.create(standard).optional(),
    situacao: CalendarioLetivoFields.situacao.create(standard).optional(),
    etapas: z.array(CalendarioLetivoEtapaInputItemSchema).optional(),
  }),
);

export const CalendarioLetivoUpdateSchema = createSchema((standard) =>
  z.object({
    nome: CalendarioLetivoFields.nome.create(standard).optional(),
    ano: CalendarioLetivoFields.ano.create(standard).optional(),
    campus: CalendarioLetivoCampusRefSchema.create(standard).optional(),
    ofertaFormacao: CalendarioLetivoOfertaFormacaoRefSchema.create(standard).optional(),
    situacao: CalendarioLetivoFields.situacao.create(standard).optional(),
    etapas: z.array(CalendarioLetivoEtapaInputItemSchema).optional(),
  }),
);
