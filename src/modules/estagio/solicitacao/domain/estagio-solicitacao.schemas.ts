import { z } from "zod";
import {
  createSchema,
  ObjectIdUuidFactory,
  ObjectIdUuidFactoryNullable,
} from "@/domain/abstractions";
import { datedSchema, uuidSchema } from "@/shared/validation/schemas";
import {
  EstagioSolicitacaoSituacaoSchema,
  EstagioSolicitacaoTipoSchema,
} from "./estagio-solicitacao.fields";

export const EstagioSolicitacaoSchema = z
  .object({
    id: uuidSchema,
    tipo: EstagioSolicitacaoTipoSchema,
    situacao: EstagioSolicitacaoSituacaoSchema,
    estagiario: ObjectIdUuidFactory.domain,
    campus: ObjectIdUuidFactory.domain,
    professorOrientador: ObjectIdUuidFactoryNullable.domain,
    localInterno: z.string().max(255).nullable(),
    descricaoAtividades: z.string().max(2000).nullable(),
    empresa: ObjectIdUuidFactoryNullable.domain,
    empresaRazaoSocial: z.string().max(255).nullable(),
    empresaNomeFantasia: z.string().max(255).nullable(),
    empresaCnpj: z.string().max(20).nullable(),
    empresaTelefone: z.string().max(20).nullable(),
    empresaEmail: z.string().email().max(255).nullable(),
    supervisorNome: z.string().max(255).nullable(),
    supervisorEmail: z.string().email().max(255).nullable(),
    supervisorTelefone: z.string().max(20).nullable(),
    analista: ObjectIdUuidFactoryNullable.domain,
    parecerAnalise: z.string().max(2000).nullable(),
    dataAnalise: z.string().nullable(),
    estagioGerado: ObjectIdUuidFactoryNullable.domain,
  })
  .extend(datedSchema.shape);

export const EstagioSolicitacaoInternoCreateSchema = createSchema((standard) =>
  z.object({
    professorConselheiro: ObjectIdUuidFactory.create(standard),
    local: z.string().min(2).max(255),
    descricao: z.string().min(5).max(2000),
  }),
);

export const EstagioSolicitacaoExternoCreateSchema = createSchema((standard) =>
  z.object({
    empresa: z.object({
      razaoSocial: z.string().min(2).max(255),
      nomeFantasia: z.string().max(255).optional().nullable(),
      cnpj: z.string().min(14).max(20),
      email: z.string().email().max(255).optional().nullable(),
      telefone: z.string().max(20).optional().nullable(),
    }),
    supervisor: z.object({
      nome: z.string().min(2).max(255),
      email: z.string().email().max(255).optional().nullable(),
      telefone: z.string().max(20).optional().nullable(),
    }),
  }),
);

export const EstagioSolicitacaoDeferirSchema = createSchema((standard) =>
  z.object({
    empresaId: uuidSchema.optional(),
    empresaEnderecoId: uuidSchema.optional(),
    parecer: z.string().max(2000).optional().nullable(),
    cargaHoraria: z.number().int().min(1).max(40).optional(),
    dataInicio: z.string().date().optional(),
    dataPrevistaFim: z.string().date().optional(),
  }),
);

export const EstagioSolicitacaoIndeferirSchema = createSchema((standard) =>
  z.object({
    parecer: z.string().min(5, "Parecer deve conter no mínimo 5 caracteres").max(2000),
  }),
);
