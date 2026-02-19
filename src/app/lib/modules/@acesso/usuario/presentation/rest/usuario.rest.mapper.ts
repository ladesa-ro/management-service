import type { UsuarioEnsinoOutput } from "@/modules/@acesso/usuario";
import {
  UsuarioCreateInputDto,
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioUpdateInputDto,
} from "@/modules/@acesso/usuario";
import {
  createFindOneInputMapper,
  createListInputMapper,
  createListOutputMapper,
  mapDatedFields,
} from "@/modules/@shared/application/mappers";
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

  static toFindOneInput = createFindOneInputMapper(UsuarioFindOneInputDto);

  static toListInput = createListInputMapper(UsuarioListInputDto, ["filter.id"]);

  static toCreateInput(dto: UsuarioCreateInputRestDto): UsuarioCreateInputDto {
    const input = new UsuarioCreateInputDto();
    input.nome = dto.nome;
    input.matriculaSiape = dto.matriculaSiape;
    input.email = dto.email;
    return input;
  }

  static toUpdateInput(
    params: UsuarioFindOneInputRestDto,
    dto: UsuarioUpdateInputRestDto,
  ): UsuarioFindOneInputDto & UsuarioUpdateInputDto {
    const input = new UsuarioFindOneInputDto() as UsuarioFindOneInputDto & UsuarioUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.matriculaSiape !== undefined) {
      input.matriculaSiape = dto.matriculaSiape;
    }
    if (dto.email !== undefined) {
      input.email = dto.email;
    }
    return input;
  }

  // ============================================================================
  // Output: Core DTO -> Server DTO
  // ============================================================================

  static toFindOneOutputDto(output: UsuarioFindOneOutputDto): UsuarioFindOneOutputRestDto {
    const dto = new UsuarioFindOneOutputRestDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.matriculaSiape = output.matriculaSiape;
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

  static toEnsinoOutputDto(output: UsuarioEnsinoOutput): UsuarioEnsinoOutputRestDto {
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
