/**
 * Calendario Indisponibilidade Professor — schemas zod para a entidade e suas operacoes.
 */
import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CalendarioIndisponibilidadeProfessorFields } from "./calendario-indisponibilidade-professor.fields";

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

export const CalendarioIndisponibilidadeProfessorSchema = z
  .object({
    id: uuidSchema,
    perfil: ObjectIdUuidFactory.domain,
    tipo: CalendarioIndisponibilidadeProfessorFields.tipo.domainSchema,
    diaSemana: CalendarioIndisponibilidadeProfessorFields.diaSemana.domainSchema,
    data: CalendarioIndisponibilidadeProfessorFields.data.domainSchema,
    inicio: CalendarioIndisponibilidadeProfessorFields.inicio.domainSchema,
    fim: CalendarioIndisponibilidadeProfessorFields.fim.domainSchema,
    motivo: CalendarioIndisponibilidadeProfessorFields.motivo.domainSchema,
  })
  .extend(datedSchema.shape)
  .refine(regraOuExcecaoConsistente, REGRA_OU_EXCECAO_MESSAGE)
  .refine(fimMaiorQueInicio, FIM_MAIOR_INICIO_MESSAGE);

// ============================================================================
// Create
// ============================================================================

export const CalendarioIndisponibilidadeProfessorCreateSchema = createSchema((standard) =>
  z
    .object({
      perfil: ObjectIdUuidFactory.create(standard),
      tipo: CalendarioIndisponibilidadeProfessorFields.tipo.create(standard),
      diaSemana: CalendarioIndisponibilidadeProfessorFields.diaSemana.create(standard).optional(),
      data: CalendarioIndisponibilidadeProfessorFields.data.create(standard).optional(),
      inicio: CalendarioIndisponibilidadeProfessorFields.inicio.create(standard),
      fim: CalendarioIndisponibilidadeProfessorFields.fim.create(standard),
      motivo: CalendarioIndisponibilidadeProfessorFields.motivo.create(standard).optional(),
    })
    .refine(regraOuExcecaoConsistente, REGRA_OU_EXCECAO_MESSAGE)
    .refine(fimMaiorQueInicio, FIM_MAIOR_INICIO_MESSAGE),
);
