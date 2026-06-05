/**
 * Estagio — definicao dos campos (FieldMetadata) da entidade.
 *
 * Cada campo contem descricao, SchemaFactory e metadados
 * reutilizados automaticamente em Swagger, GraphQL e validacao de entrada.
 *
 * @see createFieldMetadata (domain/abstractions/fields/field-metadata.ts)
 */
import { z } from "zod";
import { createFieldMetadata, createSchema, safeInt } from "@/domain/abstractions";

export const EstagioStatusValues = [
  "EM_FASE_INICIAL",
  "EM_ANDAMENTO",
  "RESCINDIDO",
  "COM_PENDENCIA",
  "ENCERRADO",
  "APTO_PARA_ENCERRAMENTO",
] as const;

export const EstagioStatusSchema = z.enum(EstagioStatusValues);

export const EstagioFields = {
  campus: createFieldMetadata({
    description: "Campus do estágio",
  }),
  empresa: createFieldMetadata({
    description: "Empresa do estágio",
  }),
  estagiario: createFieldMetadata({
    description: "Estagiário (opcional enquanto a vaga estiver aberta)",
    nullable: true,
  }),
  usuarioOrientador: createFieldMetadata({
    description: "Usuário orientador do estágio",
    nullable: true,
  }),
  cargaHoraria: createFieldMetadata({
    description: "Carga horária semanal",
    schema: createSchema((standard) => safeInt(standard, (s) => s.min(1))),
  }),
  dataInicio: createFieldMetadata({
    description: "Data de início do estágio",
    schema: createSchema(() => z.string().date()),
    nullable: true,
  }),
  dataFim: createFieldMetadata({
    description: "Data de fim do estágio",
    schema: createSchema(() => z.string().date().nullable()),
    nullable: true,
  }),
  status: createFieldMetadata({
    description: "Status do estágio",
    schema: createSchema(() => EstagioStatusSchema),
  }),
  nomeSupervisor: createFieldMetadata({
    description: "Nome do supervisor",
    schema: createSchema(() => z.string().max(255)),
    nullable: true,
  }),
  emailSupervisor: createFieldMetadata({
    description: "Email do supervisor",
    schema: createSchema(() => z.string().email().max(255)),
    nullable: true,
  }),
  telefoneSupervisor: createFieldMetadata({
    description: "Telefone do supervisor",
    schema: createSchema(() => z.string().max(20)),
    nullable: true,
  }),
  aditivo: createFieldMetadata({
    description: "Se há aditivo ao contrato",
    schema: createSchema(() => z.boolean()),
  }),
  tipoAditivo: createFieldMetadata({
    description: "Tipo de aditivo",
    schema: createSchema(() => z.string().max(255)),
    nullable: true,
  }),
  CursoReferencia: createFieldMetadata({
    description: "Referência ao curso (opcional)",
    nullable: true,
  }),
  horariosEstagio: createFieldMetadata({
    description: "Horários do estágio",
  }),
  ativo: createFieldMetadata({
    description: "Se o estágio está ativo",
  }),
  dataPrevistaFim: createFieldMetadata({
    description: "Data prevista de fim do estágio",
    schema: createSchema(() => z.string().date().nullable()),
    nullable: true,
  }),
  nomeSeguradora: createFieldMetadata({
    description: "Nome da seguradora",
    schema: createSchema(() => z.string().max(255)),
    nullable: true,
  }),
  numeroApoliceSeguro: createFieldMetadata({
    description: "Número da apólice do seguro",
    schema: createSchema(() => z.string().max(100)),
    nullable: true,
  }),
  visitasRealizadas: createFieldMetadata({
    description: "Quantidade de visitas realizadas",
    schema: createSchema((standard) => safeInt(standard, (s) => s.min(0))),
    nullable: true,
  }),
  visitasJustificadas: createFieldMetadata({
    description: "Quantidade de visitas justificadas",
    schema: createSchema((standard) => safeInt(standard, (s) => s.min(0))),
    nullable: true,
  }),
  visitasAVencer: createFieldMetadata({
    description: "Quantidade de visitas a vencer",
    schema: createSchema((standard) => safeInt(standard, (s) => s.min(0))),
    nullable: true,
  }),
  visitasNaoRealizadas: createFieldMetadata({
    description: "Quantidade de visitas não realizadas",
    schema: createSchema((standard) => safeInt(standard, (s) => s.min(0))),
    nullable: true,
  }),
  resumoPendencias: createFieldMetadata({
    description: "Resumo das pendências do estágio",
    schema: createSchema(() => z.string().max(1000)),
    nullable: true,
  }),
  encerramentoPor: createFieldMetadata({
    description: "Motivo de encerramento",
    schema: createSchema(() => z.string().max(255)),
    nullable: true,
  }),
  motivacaoDesligamento: createFieldMetadata({
    description: "Motivação do desligamento ou encerramento",
    schema: createSchema(() => z.string().max(1000)),
    nullable: true,
  }),
  motivoRescisao: createFieldMetadata({
    description: "Motivo da rescisão",
    schema: createSchema(() => z.string().max(1000)),
    nullable: true,
  }),
  mediaNotasSupervisor: createFieldMetadata({
    description: "Média das notas de avaliações semestrais do supervisor",
    schema: createSchema(() => z.number().min(0).max(10)),
    nullable: true,
  }),
  foiOuSeraContratado: createFieldMetadata({
    description: "Se o estagiário foi ou será contratado pela concedente",
    schema: createSchema(() => z.boolean()),
    nullable: true,
  }),
};
