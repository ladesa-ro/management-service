import {
  CalendarioLetivoCreateInputDto,
  CalendarioLetivoFindOneInputDto,
  CalendarioLetivoFindOneOutputDto,
  CalendarioLetivoListInputDto,
  CalendarioLetivoListOutputDto,
  CalendarioLetivoUpdateInputDto,
} from "@/modules/calendario-letivo";
import { CampusGraphqlMapper } from "@/server/nest/modules/campus/graphql/campus.graphql.mapper";
import { OfertaFormacaoGraphqlMapper } from "@/server/nest/modules/oferta-formacao/graphql/oferta-formacao.graphql.mapper";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
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
    dto.dateCreated = output.dateCreated as unknown as Date;
    dto.dateUpdated = output.dateUpdated as unknown as Date;
    dto.dateDeleted = output.dateDeleted as unknown as Date | null;
    return dto;
  }

  static toListOutputDto(
    output: CalendarioLetivoListOutputDto,
  ): CalendarioLetivoListOutputGraphQlDto {
    const dto = new CalendarioLetivoListOutputGraphQlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
