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
import {
  createListMapper,
  createMapper,
  createPaginatedInputMapper,
  mapField,
} from "@/shared/mapping";
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

export const toFindOneInput = createMapper<UsuarioFindOneInputRestDto, UsuarioFindOneQuery>(
  (dto) => {
    const input = new UsuarioFindOneQuery();
    input.id = dto.id;
    return input;
  },
);

export const toListInput = createPaginatedInputMapper<UsuarioListInputRestDto, UsuarioListQuery>(
  UsuarioListQuery,
  (dto, query) => {
    mapField(query, "filter.id", dto, "filter.id");
    mapField(query, "filter.vinculos.cargo.nome", dto, "filter.vinculos.cargo.nome");
  },
);

export const toCreateInput = createMapper<UsuarioCreateInputRestDto, UsuarioCreateCommand>(
  (dto) => {
    const input = new UsuarioCreateCommand();
    input.nome = dto.nome;
    input.matricula = dto.matricula;
    input.email = dto.email;
    input.vinculos = dto.vinculos;
    return input;
  },
);

export const toUpdateInput = createMapper<
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
  dto.campus = CampusRestMapper.toFindOneOutput.map(output.campus);
  dto.dateCreated = output.dateCreated;
  dto.dateUpdated = output.dateUpdated;
  dto.dateDeleted = output.dateDeleted;
  return dto;
}

export const toFindOneOutput = createMapper<UsuarioFindOneQueryResult, UsuarioFindOneOutputRestDto>(
  (output) => {
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
  },
);

export const toListOutput = createListMapper(UsuarioListOutputRestDto, toFindOneOutput);

export function toEnsinoOutputDto(output: UsuarioEnsinoQueryResult): UsuarioEnsinoOutputRestDto {
  const dto = new UsuarioEnsinoOutputRestDto();
  dto.usuario = toFindOneOutput.map(output.usuario);
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
