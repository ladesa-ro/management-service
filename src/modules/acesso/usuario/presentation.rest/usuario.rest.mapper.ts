import type { UsuarioEnsinoQueryResult } from "@/modules/acesso/usuario";
import {
  UsuarioCreateCommand,
  UsuarioFindOneQuery,
  type UsuarioFindOneQueryResult,
  UsuarioListQuery,
  UsuarioUpdateCommand,
} from "@/modules/acesso/usuario";
import type { PerfilNestedQueryResult } from "@/modules/acesso/usuario/perfil/domain/queries/perfil-nested.query.result";
import * as BlocoRestMapper from "@/modules/ambientes/bloco/presentation.rest/bloco.rest.mapper";
import * as CampusRestMapper from "@/modules/ambientes/campus/presentation.rest/campus.rest.mapper";
import { createListMapper, createMapper, createPaginatedInputMapper, into } from "@/shared/mapping";
import {
  type UsuarioCreateInputRestDto,
  UsuarioEnsinoCursoRefRestDto,
  UsuarioEnsinoDisciplinaRefRestDto,
  UsuarioEnsinoOutputRestDto,
  UsuarioEnsinoTurmaRefRestDto,
  type UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
  type UsuarioListInputRestDto,
  UsuarioListOutputRestDto,
  UsuarioPerfilNestedOutputRestDto,
  type UsuarioUpdateInputRestDto,
} from "./usuario.rest.dto";

// ============================================================================
// Externa -> Interna (Input: Presentation -> Core)
// ============================================================================

export const findOneInputDtoToFindOneQuery = createMapper<
  UsuarioFindOneInputRestDto,
  UsuarioFindOneQuery
>((dto) => {
  const input = new UsuarioFindOneQuery();
  input.id = dto.id;
  return input;
});

export const listInputDtoToListQuery = createPaginatedInputMapper<
  UsuarioListInputRestDto,
  UsuarioListQuery
>(UsuarioListQuery, (dto, query) => {
  into(query).field("filter.id").from(dto);
  into(query).field("filter.vinculos.cargo.nome").from(dto);
});

export const createInputDtoToCreateCommand = createMapper<
  UsuarioCreateInputRestDto,
  UsuarioCreateCommand
>((dto) => {
  const input = new UsuarioCreateCommand();
  input.nome = dto.nome;
  input.matricula = dto.matricula;
  input.email = dto.email;
  input.vinculos = dto.vinculos;
  return input;
});

export const updateInputDtoToUpdateCommand = createMapper<
  { params: UsuarioFindOneInputRestDto; dto: UsuarioUpdateInputRestDto },
  UsuarioFindOneQuery & UsuarioUpdateCommand
>(({ params, dto }) => ({
  id: params.id,
  nome: dto.nome,
  matricula: dto.matricula,
  email: dto.email,
  vinculos: dto.vinculos,
}));

// ============================================================================
// Interna -> Externa (Output: Core -> Presentation)
// ============================================================================

function getCargoNome(output: PerfilNestedQueryResult): string {
  return output.cargo?.nome ?? "";
}

export function toPerfilNestedOutputDto(
  output: PerfilNestedQueryResult,
): UsuarioPerfilNestedOutputRestDto {
  const dto = new UsuarioPerfilNestedOutputRestDto();
  dto.id = output.id;
  dto.ativo = output.ativo;
  dto.cargo = getCargoNome(output);
  dto.campus = CampusRestMapper.findOneQueryResultToOutputDto.map(output.campus);
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
}

export const findOneQueryResultToOutputDto = createMapper<
  UsuarioFindOneQueryResult,
  UsuarioFindOneOutputRestDto
>((output) => {
  const dto = new UsuarioFindOneOutputRestDto();
  dto.id = output.id;
  dto.nome = output.nome;
  dto.matricula = output.matricula;
  dto.email = output.email;
  dto.isSuperUser = output.isSuperUser;
  dto.imagemCapa = output.imagemCapa ? BlocoRestMapper.toImagemOutput(output.imagemCapa) : null;
  dto.imagemPerfil = output.imagemPerfil
    ? BlocoRestMapper.toImagemOutput(output.imagemPerfil)
    : null;
  dto.vinculos = (output.vinculos ?? []).map(toPerfilNestedOutputDto);
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
});

export const listQueryResultToListOutputDto = createListMapper(
  UsuarioListOutputRestDto,
  findOneQueryResultToOutputDto,
);

export function toEnsinoOutputDto(output: UsuarioEnsinoQueryResult): UsuarioEnsinoOutputRestDto {
  const dto = new UsuarioEnsinoOutputRestDto();
  dto.usuario = findOneQueryResultToOutputDto.mapOptional(output.usuario);
  dto.disciplinas = output.disciplinas.map((vinculoDisciplina) => {
    const disciplinaRef = new UsuarioEnsinoDisciplinaRefRestDto();
    disciplinaRef.id = vinculoDisciplina.disciplina.id;
    disciplinaRef.nome = vinculoDisciplina.disciplina.nome;
    disciplinaRef.cursos = vinculoDisciplina.cursos.map((vinculoCurso) => {
      const cursoRef = new UsuarioEnsinoCursoRefRestDto();
      cursoRef.id = vinculoCurso.curso.id;
      cursoRef.nome = vinculoCurso.curso.nome;
      cursoRef.turmas = vinculoCurso.turmas.map((vinculoTurma) => {
        const turmaRef = new UsuarioEnsinoTurmaRefRestDto();
        turmaRef.id = vinculoTurma.turma.id;
        turmaRef.periodo = vinculoTurma.turma.periodo;
        return turmaRef;
      });
      return cursoRef;
    });
    return disciplinaRef;
  });
  return dto;
}
