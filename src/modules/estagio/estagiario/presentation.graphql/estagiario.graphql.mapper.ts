import { PerfilGraphqlMapper } from "@/modules/acesso/usuario/perfil/presentation.graphql/perfil.graphql.mapper";
import { CursoGraphqlMapper } from "@/modules/ensino/curso/presentation.graphql/curso.graphql.mapper";
import { TurmaGraphqlMapper } from "@/modules/ensino/turma/presentation.graphql/turma.graphql.mapper";
import {
  EstagiarioCreateCommand,
  EstagiarioFindOneQuery,
  EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
  EstagiarioUpdateCommand,
} from "@/modules/estagio/estagiario";
import { createListOutputMapper, mapDatedFields } from "@/shared/mapping";
import {
  EstagiarioCreateInputGraphQlDto,
  EstagiarioFindOneOutputGraphQlDto,
  EstagiarioListInputGraphQlDto,
  EstagiarioListOutputGraphQlDto,
  EstagiarioUpdateInputGraphQlDto,
} from "./estagiario.graphql.dto";

export class EstagiarioGraphqlMapper {
  static toListInput(dto: EstagiarioListInputGraphQlDto | null): EstagiarioListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new EstagiarioListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.perfil.id"] = dto.filterPerfilId;
    input["filter.curso.id"] = dto.filterCursoId;
    input["filter.turma.id"] = dto.filterTurmaId;
    return input;
  }

  static toFindOneInput(id: string): EstagiarioFindOneQuery {
    const input = new EstagiarioFindOneQuery();
    input.id = id;
    return input;
  }

  static toCreateInput(dto: EstagiarioCreateInputGraphQlDto): EstagiarioCreateCommand {
    const input = new EstagiarioCreateCommand();
    input.perfil = { id: dto.perfil.id };
    input.curso = { id: dto.curso.id };
    input.turma = { id: dto.turma.id };
    input.telefone = dto.telefone;
    input.emailInstitucional = dto.emailInstitucional;
    input.dataNascimento = dto.dataNascimento;
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: EstagiarioUpdateInputGraphQlDto,
  ): EstagiarioFindOneQuery & EstagiarioUpdateCommand {
    const input = new EstagiarioFindOneQuery() as EstagiarioFindOneQuery & EstagiarioUpdateCommand;
    input.id = params.id;

    if (dto.perfil !== undefined) {
      input.perfil = { id: dto.perfil.id };
    }
    if (dto.curso !== undefined) {
      input.curso = { id: dto.curso.id };
    }
    if (dto.turma !== undefined) {
      input.turma = { id: dto.turma.id };
    }
    if (dto.telefone !== undefined) {
      input.telefone = dto.telefone;
    }
    if (dto.emailInstitucional !== undefined) {
      input.emailInstitucional = dto.emailInstitucional;
    }
    if (dto.dataNascimento !== undefined) {
      input.dataNascimento = dto.dataNascimento;
    }

    return input;
  }

  static toFindOneOutputDto(output: EstagiarioFindOneQueryResult): EstagiarioFindOneOutputGraphQlDto {
    const dto = new EstagiarioFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.perfil = PerfilGraphqlMapper.toFindOneOutputDto(output.perfil);
    dto.curso = CursoGraphqlMapper.toFindOneOutputDto(output.curso);
    dto.turma = TurmaGraphqlMapper.toFindOneOutputDto(output.turma);
    dto.telefone = output.telefone;
    dto.emailInstitucional = output.emailInstitucional;
    dto.dataNascimento = output.dataNascimento;
    dto.ativo = output.ativo;
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    EstagiarioListOutputGraphQlDto,
    EstagiarioGraphqlMapper.toFindOneOutputDto,
  );
}
