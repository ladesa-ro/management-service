import {
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoUpdateInputDto,
} from "@/Ladesa.Management.Application/horarios/calendario-letivo";
import {
  CalendarioLetivoCreateInputGraphQlDto,
  CalendarioLetivoFindOneOutputGraphQlDto,
  CalendarioLetivoListInputGraphQlDto,
  CalendarioLetivoListOutputGraphQlDto,
  CalendarioLetivoUpdateInputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/CalendarioLetivoGraphqlDto";
import { CampusGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/CampusGraphqlMapper";
import { OfertaFormacaoGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/OfertaFormacaoGraphqlMapper";

export class CalendarioLetivoGraphqlMapper {
  static toListOutputDto = createListOutputMapper(
    CalendarioLetivoListOutputGraphQlDto,
    CalendarioLetivoGraphqlMapper.toFindOneOutputDto,
  );

  static toListInput(
    dto: CalendarioLetivoListInputGraphQlDto | null,
  ): CalendarioLetivoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new CalendarioLetivoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.campus.id"] = dto.filterCampusId;
    input["filter.ofertaFormacao.id"] = dto.filterOfertaFormacaoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): CalendarioLetivoFindOneInputDto {
    const input = new CalendarioLetivoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: CalendarioLetivoCreateInputGraphQlDto): CalendarioLetivoCreateInputDto {
    const input = new CalendarioLetivoCreateInputDto();
    input.nome = dto.nome;
    input.ano = dto.ano;
    input.campus = { id: dto.campus.id };
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: CalendarioLetivoUpdateInputGraphQlDto,
  ): CalendarioLetivoFindOneInputDto & CalendarioLetivoUpdateInputDto {
    const input = new CalendarioLetivoFindOneInputDto() as CalendarioLetivoFindOneInputDto &
      CalendarioLetivoUpdateInputDto;
    input.id = params.id;
    if (dto.nome !== undefined) input.nome = dto.nome;
    if (dto.ano !== undefined) input.ano = dto.ano;
    if (dto.campus !== undefined) input.campus = { id: dto.campus.id };
    if (dto.ofertaFormacao !== undefined) input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    return input;
  }

  static toFindOneOutputDto(
    output: CalendarioLetivoFindOneOutputDto,
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
}
