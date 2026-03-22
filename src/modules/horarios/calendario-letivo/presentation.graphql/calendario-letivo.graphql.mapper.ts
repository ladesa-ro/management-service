import { CampusGraphqlMapper } from "@/modules/ambientes/campus/presentation.graphql/campus.graphql.mapper";
import { OfertaFormacaoGraphqlMapper } from "@/modules/ensino/oferta-formacao/presentation.graphql/oferta-formacao.graphql.mapper";
import {
  CalendarioLetivoCreateCommand,
  CalendarioLetivoFindOneQuery,
  CalendarioLetivoFindOneQueryResult,
  CalendarioLetivoListQuery,
  CalendarioLetivoUpdateCommand,
} from "@/modules/horarios/calendario-letivo";
import { createListOutputMapper, mapDatedFields } from "@/shared/mapping";
import {
  CalendarioLetivoCreateInputGraphQlDto,
  CalendarioLetivoFindOneOutputGraphQlDto,
  CalendarioLetivoListInputGraphQlDto,
  CalendarioLetivoListOutputGraphQlDto,
  CalendarioLetivoUpdateInputGraphQlDto,
} from "./calendario-letivo.graphql.dto";

export class CalendarioLetivoGraphqlMapper {
  static toListInput(
    dto: CalendarioLetivoListInputGraphQlDto | null,
  ): CalendarioLetivoListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new CalendarioLetivoListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.campus.id"] = dto.filterCampusId;
    input["filter.ofertaFormacao.id"] = dto.filterOfertaFormacaoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): CalendarioLetivoFindOneQuery {
    const input = new CalendarioLetivoFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: CalendarioLetivoCreateInputGraphQlDto): CalendarioLetivoCreateCommand {
    const input = new CalendarioLetivoCreateCommand();
    input.nome = dto.nome;
    input.ano = dto.ano;
    input.campus = { id: dto.campus.id };
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: CalendarioLetivoUpdateInputGraphQlDto,
  ): CalendarioLetivoFindOneQuery & CalendarioLetivoUpdateCommand {
    const input = new CalendarioLetivoFindOneQuery() as CalendarioLetivoFindOneQuery &
      CalendarioLetivoUpdateCommand;
    input.id = params.id;
    if (dto.nome !== undefined) input.nome = dto.nome;
    if (dto.ano !== undefined) input.ano = dto.ano;
    if (dto.campus !== undefined) input.campus = { id: dto.campus.id };
    if (dto.ofertaFormacao !== undefined) input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  static toFindOneOutputDto(
    output: CalendarioLetivoFindOneQueryResult,
  ): CalendarioLetivoFindOneOutputGraphQlDto {
    const dto = new CalendarioLetivoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.ano = output.ano;
    dto.campus = CampusGraphqlMapper.toFindOneOutputDto(output.campus);
    dto.ofertaFormacao = OfertaFormacaoGraphqlMapper.toFindOneOutputDto(output.ofertaFormacao);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    CalendarioLetivoListOutputGraphQlDto,
    CalendarioLetivoGraphqlMapper.toFindOneOutputDto,
  );
}
