import { z } from "zod";
import { createFieldMetadata, createSchema } from "@/domain/abstractions";

export const EstagioSolicitacaoTipoValues = ["INTERNO", "EXTERNO"] as const;
export type EstagioSolicitacaoTipo = (typeof EstagioSolicitacaoTipoValues)[number];
export const EstagioSolicitacaoTipoSchema = z.enum(EstagioSolicitacaoTipoValues);

export const EstagioSolicitacaoSituacaoValues = [
  "PENDENTE",
  "EM_ANALISE",
  "DEFERIDA",
  "INDEFERIDA",
  "CANCELADA",
] as const;
export type EstagioSolicitacaoSituacao = (typeof EstagioSolicitacaoSituacaoValues)[number];
export const EstagioSolicitacaoSituacaoSchema = z.enum(EstagioSolicitacaoSituacaoValues);

export const EstagioSolicitacaoFields = {
  id: createFieldMetadata({
    description: "Identificador único da solicitação (UUID)",
  }),
  tipo: createFieldMetadata({
    description: "Tipo de estágio solicitado (INTERNO no campus ou EXTERNO em empresa parceira)",
    schema: createSchema(() => EstagioSolicitacaoTipoSchema),
  }),
  situacao: createFieldMetadata({
    description: "Situação da solicitação no workflow de análise do CIEC",
    schema: createSchema(() => EstagioSolicitacaoSituacaoSchema),
  }),
  estagiario: createFieldMetadata({
    description: "Estagiário solicitante",
  }),
  campus: createFieldMetadata({
    description: "Campus do estágio",
  }),
  professorOrientador: createFieldMetadata({
    description: "Professor conselheiro/orientador institucional (para estágio interno)",
    nullable: true,
  }),
  localInterno: createFieldMetadata({
    description: "Local ou laboratório do campus onde o estágio interno será realizado",
    schema: createSchema(() => z.string().max(255).nullable()),
    nullable: true,
  }),
  descricaoAtividades: createFieldMetadata({
    description: "Descrição sucinta do plano de atividades do estágio interno",
    schema: createSchema(() => z.string().max(2000).nullable()),
    nullable: true,
  }),
  empresa: createFieldMetadata({
    description: "Empresa parceira oficial (quando já cadastrada ou gerada após deferimento)",
    nullable: true,
  }),
  empresaRazaoSocial: createFieldMetadata({
    description: "Razão social da empresa informada pelo aluno",
    schema: createSchema(() => z.string().max(255).nullable()),
    nullable: true,
  }),
  empresaNomeFantasia: createFieldMetadata({
    description: "Nome fantasia da empresa",
    schema: createSchema(() => z.string().max(255).nullable()),
    nullable: true,
  }),
  empresaCnpj: createFieldMetadata({
    description: "CNPJ da concedente externa",
    schema: createSchema(() => z.string().max(20).nullable()),
    nullable: true,
  }),
  empresaTelefone: createFieldMetadata({
    description: "Telefone de contato da empresa",
    schema: createSchema(() => z.string().max(20).nullable()),
    nullable: true,
  }),
  empresaEmail: createFieldMetadata({
    description: "E-mail de contato da empresa",
    schema: createSchema(() => z.string().email().max(255).nullable()),
    nullable: true,
  }),
  supervisorNome: createFieldMetadata({
    description: "Nome do supervisor indicado na empresa concedente",
    schema: createSchema(() => z.string().max(255).nullable()),
    nullable: true,
  }),
  supervisorEmail: createFieldMetadata({
    description: "E-mail do supervisor na empresa",
    schema: createSchema(() => z.string().email().max(255).nullable()),
    nullable: true,
  }),
  supervisorTelefone: createFieldMetadata({
    description: "Telefone do supervisor na empresa",
    schema: createSchema(() => z.string().max(20).nullable()),
    nullable: true,
  }),
  analista: createFieldMetadata({
    description: "Servidor do CIEC responsável pela análise do pedido",
    nullable: true,
  }),
  parecerAnalise: createFieldMetadata({
    description: "Parecer descritivo da análise do CIEC (obrigatório em caso de indeferimento)",
    schema: createSchema(() => z.string().max(2000).nullable()),
    nullable: true,
  }),
  dataAnalise: createFieldMetadata({
    description: "Data e hora em que a análise pelo CIEC foi concluída",
    schema: createSchema(() => z.string().nullable()),
    nullable: true,
  }),
  estagioGerado: createFieldMetadata({
    description: "Estágio criado oficialmente após deferimento da solicitação",
    nullable: true,
  }),
};
