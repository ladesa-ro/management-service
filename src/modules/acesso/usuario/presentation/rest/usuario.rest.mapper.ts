import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
import type { UsuarioEnsinoQueryResult } from "@/modules/acesso/usuario";
import {
  UsuarioCreateCommand,
  UsuarioFindOneQuery,
  UsuarioFindOneQueryResult,
  UsuarioListQuery,
  UsuarioUpdateCommand,
} from "@/modules/acesso/usuario";
import { BlocoRestMapper } from "@/modules/ambientes/bloco/presentation/rest";
import {
  UsuarioCreateInputRestDto,
  UsuarioEnsinoCursoRefRestDto,
  UsuarioEnsinoDisciplinaRefRestDto,
  UsuarioEnsinoOutputRestDto,
  UsuarioEnsinoTurmaRefRestDto,
  UsuarioFindOneInputRestDto,
  UsuarioFindOneOutputRestDto,
  UsuarioListOutputRestDto,
  UsuarioUpdateInputRestDto,
} from "./usuario.rest.dto";

export class UsuarioRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput = createFindOneInputMapper(UsuarioFindOneQuery);

  static toListInput = createListInputMapper(UsuarioListQuery, ["filter.id"]);

  static toCreateInput(dto: UsuarioCreateInputRestDto): UsuarioCreateCommand {
    const input = new UsuarioCreateCommand();
    input.nome = dto.nome;
    input.matricula = dto.matricula;
    input.email = dto.email;
    return input;
  }

  static toUpdateInput(
    params: UsuarioFindOneInputRestDto,
    dto: UsuarioUpdateInputRestDto,
  ): UsuarioFindOneQuery & UsuarioUpdateCommand {
    const input = new UsuarioFindOneQuery() as UsuarioFindOneQuery & UsuarioUpdateCommand;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.matricula !== undefined) {
      input.matricula = dto.matricula;
    }
    if (dto.email !== undefined) {
      input.email = dto.email;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: UsuarioFindOneQueryResult): UsuarioFindOneOutputRestDto {
    const dto = new UsuarioFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.matricula = output.matricula;
    dto.email = output.email;
    dto.isSuperUser = output.isSuperUser;
    dto.imagemCapa = output.imagemCapa
      ? BlocoRestMapper.toImagemOutputDto(output.imagemCapa)
      : null;
    dto.imagemPerfil = output.imagemPerfil
      ? BlocoRestMapper.toImagemOutputDto(output.imagemPerfil)
      : null;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    UsuarioListOutputRestDto,
    UsuarioRestMapper.toFindOneOutputDto,
  );

  static toEnsinoOutputDto(output: UsuarioEnsinoQueryResult): UsuarioEnsinoOutputRestDto {
    const dto = new UsuarioEnsinoOutputRestDto();
    dto.usuario = this.toFindOneOutputDto(output.usuario);
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
}
