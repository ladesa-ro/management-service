import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import {
  ProfessorIndisponibilidadeFindOneOutputDto,
  ProfessorIndisponibilidadeListInputDto,
} from "@/modules/ensino/professor-indisponibilidade/application/dtos";
import {
  ProfessorIndisponibilidadeFindOneOutputGraphQlDto,
  ProfessorIndisponibilidadeListInputGraphQlDto,
  ProfessorIndisponibilidadeListOutputGraphQlDto,
} from "./professor-indisponibilidade.graphql.dto";

export class ProfessorIndisponibilidadeGraphqlMapper {
  static toListInput(
    dto: ProfessorIndisponibilidadeListInputGraphQlDto | null,
  ): ProfessorIndisponibilidadeListInputDto | null {
    if (!dto) return null;
    const input = new ProfessorIndisponibilidadeListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    if (dto.filterPerfilId) {
      input["filter.perfil.id"] = dto.filterPerfilId;
    }
    return input;
  }

  static toFindOneOutputDto(
    output: ProfessorIndisponibilidadeFindOneOutputDto,
  ): ProfessorIndisponibilidadeFindOneOutputGraphQlDto {
    const dto = new ProfessorIndisponibilidadeFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.idPerfilFk = output.perfil?.id ?? "";
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
