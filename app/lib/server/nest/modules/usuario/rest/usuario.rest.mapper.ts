import type { UsuarioEnsinoOutput } from "@/modules/usuario";
import {
  UsuarioCreateInput,
  UsuarioFindOneInput,
  UsuarioFindOneOutput,
  UsuarioListInput,
  UsuarioListOutput,
  UsuarioUpdateInput,
} from "@/modules/usuario";
import {
  ImagemArquivoFindOneFromImagemOutputDto,
  ImagemFindOneOutputDto,
} from "@/server/nest/modules/bloco/rest";
import {
  UsuarioCreateInputDto,
  UsuarioEnsinoCursoRefDto,
  UsuarioEnsinoDisciplinaRefDto,
  UsuarioEnsinoOutputDto,
  UsuarioEnsinoTurmaRefDto,
  UsuarioFindOneInputDto,
  UsuarioFindOneOutputDto,
  UsuarioListInputDto,
  UsuarioListOutputDto,
  UsuarioUpdateInputDto,
} from "./usuario.rest.dto";

export class UsuarioRestMapper {
  // ============================================================================
  // Input: Server DTO -> Core DTO
  // ============================================================================

  static toFindOneInput(dto: UsuarioFindOneInputDto): UsuarioFindOneInput {
    const input = new UsuarioFindOneInput();
    input.id = dto.id;
    return input;
  }

  static toListInput(dto: UsuarioListInputDto | null): UsuarioListInput | null {
    if (!dto) {
      return null;
    }

    const input = new UsuarioListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.selection = dto.selection;
    input["filter.id"] = dto["filter.id"];
    return input;
  }

  static toCreateInput(dto: UsuarioCreateInputDto): UsuarioCreateInput {
    const input = new UsuarioCreateInput();
    input.nome = dto.nome;
    input.matriculaSiape = dto.matriculaSiape;
    input.email = dto.email;
    return input;
  }

  static toUpdateInput(
    params: UsuarioFindOneInputDto,
    dto: UsuarioUpdateInputDto,
  ): UsuarioFindOneInput & UsuarioUpdateInput {
    const input = new UsuarioFindOneInput() as UsuarioFindOneInput & UsuarioUpdateInput;
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

  static toFindOneOutputDto(output: UsuarioFindOneOutput): UsuarioFindOneOutputDto {
    const dto = new UsuarioFindOneOutputDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.matriculaSiape = output.matriculaSiape;
    dto.email = output.email;
    dto.isSuperUser = output.isSuperUser;
    dto.imagemCapa = output.imagemCapa ? this.toImagemOutputDto(output.imagemCapa as any) : null;
    dto.imagemPerfil = output.imagemPerfil
      ? this.toImagemOutputDto(output.imagemPerfil as any)
      : null;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toImagemOutputDto(output: any): ImagemFindOneOutputDto {
    const dto = new ImagemFindOneOutputDto();
    dto.id = output.id;
    dto.descricao = output.descricao;
    dto.versoes = (output.versoes || []).map((v: any) => {
      const versaoDto = new ImagemArquivoFindOneFromImagemOutputDto();
      versaoDto.id = v.id;
      versaoDto.largura = v.largura;
      versaoDto.altura = v.altura;
      versaoDto.formato = v.formato;
      versaoDto.mimeType = v.mimeType;
      versaoDto.arquivo = { id: v.arquivo?.id };
      return versaoDto;
    });
    dto.dateCreated = output.dateCreated ? new Date(output.dateCreated) : new Date();
    dto.dateUpdated = output.dateUpdated ? new Date(output.dateUpdated) : new Date();
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: UsuarioListOutput): UsuarioListOutputDto {
    const dto = new UsuarioListOutputDto();
    dto.meta = {
      currentPage: output.meta.currentPage,
      totalPages: output.meta.totalPages,
      itemsPerPage: output.meta.itemsPerPage,
      totalItems: output.meta.totalItems,
      sortBy: output.meta.sortBy,
      filter: output.meta.filter,
      search: output.meta.search,
    };
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }

  static toEnsinoOutputDto(output: UsuarioEnsinoOutput): UsuarioEnsinoOutputDto {
    const dto = new UsuarioEnsinoOutputDto();
    dto.usuario = this.toFindOneOutputDto(output.usuario);
    dto.disciplinas = output.disciplinas.map((vinculoDisciplina) => {
      const disciplinaRef = new UsuarioEnsinoDisciplinaRefDto();
      disciplinaRef.id = vinculoDisciplina.disciplina.id;
      disciplinaRef.nome = vinculoDisciplina.disciplina.nome;
      disciplinaRef.cursos = vinculoDisciplina.cursos.map((vinculoCurso) => {
        const cursoRef = new UsuarioEnsinoCursoRefDto();
        cursoRef.id = vinculoCurso.curso.id;
        cursoRef.nome = vinculoCurso.curso.nome;
        cursoRef.turmas = vinculoCurso.turmas.map((vinculoTurma) => {
          const turmaRef = new UsuarioEnsinoTurmaRefDto();
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
