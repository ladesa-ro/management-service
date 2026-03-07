import {
  createListOutputMapper,
  mapDatedFields,
} from "@/Ladesa.Management.Application/@shared/application/mappers";
import {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "@/Ladesa.Management.Application/ensino/oferta-formacao-nivel-formacao";
import {
  OfertaFormacaoNivelFormacaoCreateInputGraphQlDto,
  OfertaFormacaoNivelFormacaoFindOneOutputGraphQlDto,
  OfertaFormacaoNivelFormacaoListInputGraphQlDto,
  OfertaFormacaoNivelFormacaoListOutputGraphQlDto,
  OfertaFormacaoNivelFormacaoUpdateInputGraphQlDto,
} from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Dtos/OfertaFormacaoNivelFormacaoGraphqlDto";
import { NivelFormacaoGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/NivelFormacaoGraphqlMapper";
import { OfertaFormacaoGraphqlMapper } from "@/Ladesa.Management.Server.Api/Apis/GraphQl/Mappers/OfertaFormacaoGraphqlMapper";

export class OfertaFormacaoNivelFormacaoGraphqlMapper {
  static toListOutputDto = createListOutputMapper(
    OfertaFormacaoNivelFormacaoListOutputGraphQlDto,
    OfertaFormacaoNivelFormacaoGraphqlMapper.toFindOneOutputDto,
  );

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
}
