import * as PerfilRestMapper from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.mapper";
import * as CursoRestMapper from "@/modules/ensino/curso/presentation.rest/curso.rest.mapper";
import * as TurmaRestMapper from "@/modules/ensino/turma/presentation.rest/turma.rest.mapper";
import {
  EstagiarioBatchCreateCommand,
  EstagiarioCreateCommand,
  EstagiarioUpdateCommand,
} from "@/modules/estagio/estagiario/domain/commands";
import {
  EstagiarioFindOneQuery,
  type EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
} from "@/modules/estagio/estagiario/domain/queries";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import type { EstagiarioBatchJob } from "../application/jobs/estagiario-batch-create-from-file.job.service";
import {
  type EstagiarioBatchCreateInputRestDto,
  EstagiarioBatchJobOutputRestDto,
  type EstagiarioCreateInputRestDto,
  type EstagiarioFindOneInputRestDto,
  EstagiarioFindOneOutputRestDto,
  type EstagiarioListInputRestDto,
  EstagiarioListOutputRestDto,
  type EstagiarioUpdateInputRestDto,
} from "./estagiario.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  EstagiarioFindOneInputRestDto,
  EstagiarioFindOneQuery
>((dto) => {
  const input = new EstagiarioFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  EstagiarioListInputRestDto,
  EstagiarioListQuery
>(EstagiarioListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.perfil.id").from(dto);
  into(query).field("filter.curso.id").from(dto);
  into(query).field("filter.turma.id").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  EstagiarioCreateInputRestDto,
  EstagiarioCreateCommand
>((dto) => ({
  perfil: { id: dto.perfil.id },
  curso: { id: dto.curso.id },
  turma: { id: dto.turma.id },
  telefone: dto.telefone,
  emailInstitucional: dto.emailInstitucional,
  dataNascimento: dto.dataNascimento,
}));

export const batchCreateInputDtoToCommand = createMapper<
  EstagiarioBatchCreateInputRestDto,
  EstagiarioBatchCreateCommand
>((dto) => ({
  estagiarios: dto.estagiarios.map((item) => ({
    usuario: {
      nome: item.usuario.nome,
      matricula: item.usuario.matricula,
      email: item.usuario.email,
      vinculos: item.usuario.vinculos,
    },
    curso: { id: item.curso.id },
    turma: { id: item.turma.id },
    telefone: item.telefone,
    emailInstitucional: item.emailInstitucional,
    dataNascimento: item.dataNascimento,
  })),
}));

export const updateInputDtoToUpdateCommand = createMapper<
  { params: EstagiarioFindOneInputRestDto; dto: EstagiarioUpdateInputRestDto },
  EstagiarioFindOneQuery & EstagiarioUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  perfil: dto.perfil ? { id: dto.perfil.id } : undefined,
  curso: dto.curso ? { id: dto.curso.id } : undefined,
  turma: dto.turma ? { id: dto.turma.id } : undefined,
  telefone: dto.telefone,
  emailInstitucional: dto.emailInstitucional,
  dataNascimento: dto.dataNascimento,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

export const findOneQueryResultToOutputDto = createMapper<
  EstagiarioFindOneQueryResult,
  EstagiarioFindOneOutputRestDto
>((output) => ({
  id: output.id,
  perfil: PerfilRestMapper.findOneQueryResultToOutputDto.mapOptional(output.perfil),
  curso: CursoRestMapper.findOneQueryResultToOutputDto.mapOptional(output.curso),
  turma: TurmaRestMapper.findOneQueryResultToOutputDto.mapOptional(output.turma),
  telefone: output.telefone,
  emailInstitucional: output.emailInstitucional,
  dataNascimento: output.dataNascimento,
  ativo: output.ativo,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const listQueryResultToListOutputDto = createListMapper(
  EstagiarioListOutputRestDto,
  findOneQueryResultToOutputDto,
);

export const batchJobToOutputDto = createMapper<
  EstagiarioBatchJob,
  EstagiarioBatchJobOutputRestDto
>((job) => ({
  id: job.id,
  status: job.status,
  totalItems: job.totalItems,
  successCount: job.successCount,
  failCount: job.failCount,
  errorMessage: job.errorMessage,
  dateCreated: job.dateCreated,
  dateUpdated: job.dateUpdated,
}));
