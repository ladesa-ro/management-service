import { z } from "zod";
import { createSchema, ObjectIdUuidFactory } from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import { CalendarioIndisponibilidadeProfessorFields } from "./calendario-indisponibilidade-professor.fields";

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
