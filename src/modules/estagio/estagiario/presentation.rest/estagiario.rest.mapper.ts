import * as PerfilRestMapper from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.mapper";
import * as CursoRestMapper from "@/modules/ensino/curso/presentation.rest/curso.rest.mapper";
import * as TurmaRestMapper from "@/modules/ensino/turma/presentation.rest/turma.rest.mapper";
import {
  EstagiarioCreateCommand,
  EstagiarioUpdateCommand,
} from "@/modules/estagio/estagiario/domain/commands";
import {
  EstagiarioFindOneQuery,
  type EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
} from "@/modules/estagio/estagiario/domain/queries";
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
import {
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

export const toFindOneInput = createMapper<EstagiarioFindOneInputRestDto, EstagiarioFindOneQuery>(
  (dto) => {
    const input = new EstagiarioFindOneQuery();
    input.id = dto.id;
    return input;
  },
);

export const toListInput = createPaginatedInputMapper<
  EstagiarioListInputRestDto,
  EstagiarioListQuery
>(EstagiarioListQuery, (dto, query) => {
  mapField(query, "filter.id", dto, "filter.id");
  mapField(query, "filter.perfil.id", dto, "filter.perfil.id");
  mapField(query, "filter.curso.id", dto, "filter.curso.id");
  mapField(query, "filter.turma.id", dto, "filter.turma.id");
});

export const toCreateInput = createMapper<EstagiarioCreateInputRestDto, EstagiarioCreateCommand>(
  (dto) => ({
    perfil: { id: dto.perfil.id },
    curso: { id: dto.curso.id },
    turma: { id: dto.turma.id },
    telefone: dto.telefone,
    emailInstitucional: dto.emailInstitucional,
    dataNascimento: dto.dataNascimento,
  }),
);

export const toUpdateInput = createMapper<
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

export const toFindOneOutput = createMapper<
  EstagiarioFindOneQueryResult,
  EstagiarioFindOneOutputRestDto
>((output) => ({
  id: output.id,
  perfil: PerfilRestMapper.toFindOneOutput.map(output.perfil),
  curso: CursoRestMapper.toFindOneOutput.map(output.curso),
  turma: TurmaRestMapper.toFindOneOutput.map(output.turma),
  telefone: output.telefone,
  emailInstitucional: output.emailInstitucional,
  dataNascimento: output.dataNascimento,
  ativo: output.ativo,
  dateCreated: output.dateCreated,
  dateUpdated: output.dateUpdated,
  dateDeleted: output.dateDeleted,
}));

export const toListOutput = createListMapper(EstagiarioListOutputRestDto, toFindOneOutput);
