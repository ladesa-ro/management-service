import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
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
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    ProfessorIndisponibilidadeListOutputGraphQlDto,
    ProfessorIndisponibilidadeGraphqlMapper.toFindOneOutputDto,
  );
}
