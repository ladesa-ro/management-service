import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput,
} from "@/modules/grade-horario-oferta-formacao-intervalo-de-tempo";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
} from "../rest/grade-horario-oferta-formacao-intervalo-de-tempo.rest.dto";
import {
  GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGqlDto,
  GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGqlDto,
} from "./grade-horario-oferta-formacao-intervalo-de-tempo.graphql.dto";

export class GradeHorarioOfertaFormacaoIntervaloDeTempoGraphqlMapper {
  static toListInput(
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoListInputGqlDto | null,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new GradeHorarioOfertaFormacaoIntervaloDeTempoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    return input;
  }

  static toFindOneInput(
    id: string,
    selection?: string[],
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput {
    const input = new GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInputRestDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput {
    return dto as unknown as GradeHorarioOfertaFormacaoIntervaloDeTempoCreateInput;
  }

  static toUpdateInput(
    dto: GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInputRestDto,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput {
    return dto as unknown as GradeHorarioOfertaFormacaoIntervaloDeTempoUpdateInput;
  }

  static toFindOneOutputDto(
    output: GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutput,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto {
    return output as unknown as GradeHorarioOfertaFormacaoIntervaloDeTempoFindOneOutputRestDto;
  }

  static toListOutputDto(
    output: GradeHorarioOfertaFormacaoIntervaloDeTempoListOutput,
  ): GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGqlDto {
    const dto = new GradeHorarioOfertaFormacaoIntervaloDeTempoListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
