import {
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorUpdateInputDto,
} from "@/modules/ensino/diario-professor";
import { PerfilGraphqlMapper } from "@/server/nest/modules/perfil/graphql/perfil.graphql.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
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
  ): DiarioProfessorListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new DiarioProfessorListInputDto();
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

  static toFindOneInput(id: string, selection?: string[]): DiarioProfessorFindOneInputDto {
    const input = new DiarioProfessorFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: DiarioProfessorCreateInputGraphQlDto): DiarioProfessorCreateInputDto {
    const input = new DiarioProfessorCreateInputDto();
    input.situacao = dto.situacao;
    input.diario = { id: dto.diario.id };
    input.perfil = { id: dto.perfil.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: DiarioProfessorUpdateInputGraphQlDto,
  ): DiarioProfessorFindOneInputDto & DiarioProfessorUpdateInputDto {
    const input = new DiarioProfessorFindOneInputDto() as DiarioProfessorFindOneInputDto &
      DiarioProfessorUpdateInputDto;
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
    output: DiarioProfessorFindOneOutputDto,
  ): DiarioProfessorFindOneOutputGraphQlDto {
    const dto = new DiarioProfessorFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.situacao = output.situacao;
    dto.diario = output.diario as unknown as DiarioProfessorDiarioOutputGraphQlDto;
    dto.perfil = PerfilGraphqlMapper.toFindOneOutputDto(output.perfil);
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(
    output: DiarioProfessorListOutputDto,
  ): DiarioProfessorListOutputGraphQlDto {
    const dto = new DiarioProfessorListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
