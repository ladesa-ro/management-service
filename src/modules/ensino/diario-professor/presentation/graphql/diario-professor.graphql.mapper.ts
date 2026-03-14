import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import { PerfilGraphqlMapper } from "@/modules/acesso/perfil/presentation/graphql/perfil.graphql.mapper";
import {
  DiarioProfessorCreateCommand,
  DiarioProfessorFindOneQuery,
  DiarioProfessorFindOneQueryResult,
  DiarioProfessorListQuery,
  DiarioProfessorUpdateCommand,
} from "@/modules/ensino/diario-professor";
import {
  DiarioProfessorCreateInputGraphQlDto,
  DiarioProfessorDiarioOutputGraphQlDto,
  DiarioProfessorFindOneOutputGraphQlDto,
  DiarioProfessorListInputGraphQlDto,
  DiarioProfessorListOutputGraphQlDto,
  DiarioProfessorUpdateInputGraphQlDto,
} from "./diario-professor.graphql.dto";

export class DiarioProfessorGraphqlMapper {
  static toListInput(
    dto: DiarioProfessorListInputGraphQlDto | null,
  ): DiarioProfessorListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioProfessorListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.perfil.usuario.id"] = dto.filterPerfilUsuarioId;
    input["filter.perfil.id"] = dto.filterPerfilId;
    input["filter.diario.id"] = dto.filterDiarioId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): DiarioProfessorFindOneQuery {
    const input = new DiarioProfessorFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: DiarioProfessorCreateInputGraphQlDto): DiarioProfessorCreateCommand {
    const input = new DiarioProfessorCreateCommand();
    input.situacao = dto.situacao;
    input.diario = { id: dto.diario.id };
    input.perfil = { id: dto.perfil.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: DiarioProfessorUpdateInputGraphQlDto,
  ): DiarioProfessorFindOneQuery & DiarioProfessorUpdateCommand {
    const input = new DiarioProfessorFindOneQuery() as DiarioProfessorFindOneQuery &
      DiarioProfessorUpdateCommand;
    input.id = params.id;
    if (dto.situacao !== undefined) {
      input.situacao = dto.situacao;
    }
    if (dto.diario !== undefined) {
      input.diario = { id: dto.diario.id };
    }
    if (dto.perfil !== undefined) {
      input.perfil = { id: dto.perfil.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: DiarioProfessorFindOneQueryResult,
  ): DiarioProfessorFindOneOutputGraphQlDto {
    const dto = new DiarioProfessorFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.situacao = output.situacao;
    dto.diario = output.diario as unknown as DiarioProfessorDiarioOutputGraphQlDto;
    dto.perfil = PerfilGraphqlMapper.toFindOneOutputDto(output.perfil);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    DiarioProfessorListOutputGraphQlDto,
    DiarioProfessorGraphqlMapper.toFindOneOutputDto,
  );
}
