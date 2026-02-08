import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  ProfessorIndisponibilidadeFindOneOutputDto,
  ProfessorIndisponibilidadeListInputDto,
  ProfessorIndisponibilidadeListOutputDto,
} from "../rest/professor-indisponibilidade.rest.dto";
import {
  ProfessorIndisponibilidadeListInputGqlDto,
  ProfessorIndisponibilidadeListOutputGqlDto,
} from "./professor-indisponibilidade.graphql.dto";

export class ProfessorIndisponibilidadeGraphqlMapper {
  static toListInput(
    dto: ProfessorIndisponibilidadeListInputGqlDto | null,
  ): ProfessorIndisponibilidadeListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new ProfessorIndisponibilidadeListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input.idPerfilFk = dto.filterPerfilId;
    return input;
  }

  static toFindOneOutputDto(
    output: ProfessorIndisponibilidadeFindOneOutputDto,
  ): ProfessorIndisponibilidadeFindOneOutputDto {
    const dto = new ProfessorIndisponibilidadeFindOneOutputDto();
    dto.id = output.id;
    dto.idPerfilFk = output.idPerfilFk;
    dto.diaDaSemana = output.diaDaSemana;
    dto.horaInicio = output.horaInicio;
    dto.horaFim = output.horaFim;
    dto.motivo = output.motivo;
    dto.dateCreated = output.dateCreated ? new Date(output.dateCreated) : undefined;
    dto.dateUpdated = output.dateUpdated ? new Date(output.dateUpdated) : undefined;
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(
    output: ProfessorIndisponibilidadeListOutputDto,
  ): ProfessorIndisponibilidadeListOutputGqlDto {
    const dto = new ProfessorIndisponibilidadeListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
