/**
 * Calendario Indisponibilidade Ambiente — schemas zod para a entidade e suas operacoes.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CalendarioIndisponibilidadeAmbienteFields } from "./calendario-indisponibilidade-ambiente.fields";

// ============================================================================
// Regra: exatamente um entre diaSemana (regra semanal) e data (exceção pontual)
// deve estar preenchido. Redundante de propósito com o CHECK da migração —
// mesmo padrão já usado em visibilidade/campus de calendario_colecao.
// ============================================================================

function regraOuExcecaoConsistente(dados: { diaSemana?: number | null; data?: string | null }) {
  const temDiaSemana = dados.diaSemana !== undefined && dados.diaSemana !== null;
  const temData = dados.data !== undefined && dados.data !== null;
  return temDiaSemana !== temData;
}

const REGRA_OU_EXCECAO_MESSAGE = {
  message:
    "Informe exatamente um entre diaSemana (regra semanal recorrente) e data (exceção pontual)",
  path: ["diaSemana"],
};

// ============================================================================
// Regra: fim deve ser maior que inicio. Redundante de propósito com o segundo
// CHECK da migração — mesmo padrão já usado em turma_disponibilidade.
// ============================================================================

function fimMaiorQueInicio(dados: { inicio?: string; fim?: string }) {
  if (!dados.inicio || !dados.fim) return true;
  return dados.fim > dados.inicio;
}

const FIM_MAIOR_INICIO_MESSAGE = {
  message: "fim deve ser maior que inicio",
  path: ["fim"],
};

// ============================================================================
// Schema completo do aggregate (para load)
// ============================================================================

export const CalendarioIndisponibilidadeAmbienteSchema = z
  .object({
    id: uuidSchema,
    ambiente: ObjectIdUuidFactory.domain,
    tipo: CalendarioIndisponibilidadeAmbienteFields.tipo.domainSchema,
    diaSemana: CalendarioIndisponibilidadeAmbienteFields.diaSemana.domainSchema,
    data: CalendarioIndisponibilidadeAmbienteFields.data.domainSchema,
    inicio: CalendarioIndisponibilidadeAmbienteFields.inicio.domainSchema,
    fim: CalendarioIndisponibilidadeAmbienteFields.fim.domainSchema,
    motivo: CalendarioIndisponibilidadeAmbienteFields.motivo.domainSchema,
  })
  .extend(datedSchema.shape)
  .refine(regraOuExcecaoConsistente, REGRA_OU_EXCECAO_MESSAGE)
  .refine(fimMaiorQueInicio, FIM_MAIOR_INICIO_MESSAGE);

// ============================================================================
// Create
// ============================================================================

export const CalendarioIndisponibilidadeAmbienteCreateSchema = createSchema((standard) =>
  z
    .object({
      ambiente: ObjectIdUuidFactory.create(standard),
      tipo: CalendarioIndisponibilidadeAmbienteFields.tipo.create(standard),
      diaSemana: CalendarioIndisponibilidadeAmbienteFields.diaSemana.create(standard).optional(),
      data: CalendarioIndisponibilidadeAmbienteFields.data.create(standard).optional(),
      inicio: CalendarioIndisponibilidadeAmbienteFields.inicio.create(standard),
      fim: CalendarioIndisponibilidadeAmbienteFields.fim.create(standard),
      motivo: CalendarioIndisponibilidadeAmbienteFields.motivo.create(standard).optional(),
    })
    .refine(regraOuExcecaoConsistente, REGRA_OU_EXCECAO_MESSAGE)
    .refine(fimMaiorQueInicio, FIM_MAIOR_INICIO_MESSAGE),
);
