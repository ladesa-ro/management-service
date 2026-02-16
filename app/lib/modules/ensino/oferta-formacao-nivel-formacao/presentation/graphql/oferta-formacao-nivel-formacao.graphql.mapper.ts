import { NivelFormacaoGraphqlMapper } from "@/modules/ensino/nivel-formacao/presentation/graphql/nivel-formacao.graphql.mapper";
import { OfertaFormacaoGraphqlMapper } from "@/modules/ensino/oferta-formacao/presentation/graphql/oferta-formacao.graphql.mapper";
import {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "@/modules/ensino/oferta-formacao-nivel-formacao";
import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import {
  OfertaFormacaoNivelFormacaoCreateInputGraphQlDto,
  OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto,
  OfertaFormacaoNivelFormacaoListInputGraphQlDto,
  OfertaFormacaoNivelFormacaoListOutputGraphQlDto,
  OfertaFormacaoNivelFormacaoUpdateInputGraphQlDto,
} from "./oferta-formacao-nivel-formacao.graphql.dto";

export class OfertaFormacaoNivelFormacaoGraphqlMapper {
  static toListInput(
    dto: OfertaFormacaoNivelFormacaoListInputGraphQlDto | null,
  ): OfertaFormacaoNivelFormacaoListInputDto | null {
    if (!dto) {
      return null;
    }

    const input = new OfertaFormacaoNivelFormacaoListInputDto();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.nivelFormacao.id"] = dto.filterNivelFormacaoId;
    input["filter.ofertaFormacao.id"] = dto.filterOfertaFormacaoId;
    return input;
  }

  static toFindOneInput(
    id: string,
    selection?: string[],
  ): OfertaFormacaoNivelFormacaoFindOneInputDto {
    const input = new OfertaFormacaoNivelFormacaoFindOneInputDto();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(
    dto: OfertaFormacaoNivelFormacaoCreateInputGraphQlDto,
  ): OfertaFormacaoNivelFormacaoCreateInputDto {
    const input = new OfertaFormacaoNivelFormacaoCreateInputDto();
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    input.nivelFormacao = { id: dto.nivelFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: OfertaFormacaoNivelFormacaoUpdateInputGraphQlDto,
  ): OfertaFormacaoNivelFormacaoFindOneInputDto & OfertaFormacaoNivelFormacaoUpdateInputDto {
    const input =
      new OfertaFormacaoNivelFormacaoFindOneInputDto() as OfertaFormacaoNivelFormacaoFindOneInputDto &
        OfertaFormacaoNivelFormacaoUpdateInputDto;
    input.id = params.id;
    if (dto.ofertaFormacao !== undefined) {
      input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    }
    if (dto.nivelFormacao !== undefined) {
      input.nivelFormacao = { id: dto.nivelFormacao.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: OfertaFormacaoNivelFormacaoFindOneOutputDto,
  ): OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto {
    const dto = new OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.ofertaFormacao = OfertaFormacaoGraphqlMapper.toFindOneOutputDto(output.ofertaFormacao);
    dto.nivelFormacao = NivelFormacaoGraphqlMapper.toFindOneOutputDto(output.nivelFormacao);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    OfertaFormacaoNivelFormacaoListOutputGraphQlDto,
    OfertaFormacaoNivelFormacaoGraphqlMapper.toFindOneOutputDto,
  );
}
