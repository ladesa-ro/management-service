import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  ProfessorIndisponibilidadeFindOneOutputGraphQlDto,
  ProfessorIndisponibilidadeListInputGraphQlDto,
  ProfessorIndisponibilidadeListOutputGraphQlDto,
} from "./professor-indisponibilidade.graphql.dto";

export class ProfessorIndisponibilidadeGraphqlMapper {
  static toListInput(dto: ProfessorIndisponibilidadeListInputGraphQlDto | null): {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string[];
    idPerfilFk?: string;
  } | null {
    if (!dto) {
      return null;
    }

    return {
      page: dto.page,
      limit: dto.limit,
      search: dto.search,
      sortBy: dto.sortBy,
      idPerfilFk: dto.filterPerfilId,
    };
  }

  static toFindOneOutputDto(output: any): ProfessorIndisponibilidadeFindOneOutputGraphQlDto {
    const dto = new ProfessorIndisponibilidadeFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.idPerfilFk = output.idPerfilFk;
    dto.diaDaSemana = output.diaDaSemana;
    dto.horaInicio = output.horaInicio;
    dto.horaFim = output.horaFim;
    dto.motivo = output.motivo;
    dto.dateCreated = output.dateCreated
      ? new Date(output.dateCreated)
      : (undefined as unknown as Date);
    dto.dateUpdated = output.dateUpdated
      ? new Date(output.dateUpdated)
      : (undefined as unknown as Date);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(output: any): ProfessorIndisponibilidadeListOutputGraphQlDto {
    const dto = new ProfessorIndisponibilidadeListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item: any) => this.toFindOneOutputDto(item));
    return dto;
  }
}
