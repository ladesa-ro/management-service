import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CalendarioIndisponibilidadeAmbienteFields } from "./calendario-indisponibilidade-ambiente.fields";

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

function fimMaiorQueInicio(dados: { inicio?: string; fim?: string }) {
  if (!dados.inicio || !dados.fim) return true;
  return dados.fim > dados.inicio;
}

const FIM_MAIOR_INICIO_MESSAGE = {
  message: "fim deve ser maior que inicio",
  path: ["fim"],
};

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
