import { createListOutputMapper, mapDatedFields } from "@/modules/@shared/application/mappers";
import { NivelFormacaoGraphqlMapper } from "@/modules/ensino/nivel-formacao/presentation/graphql/nivel-formacao.graphql.mapper";
import { OfertaFormacaoGraphqlMapper } from "@/modules/ensino/oferta-formacao/presentation/graphql/oferta-formacao.graphql.mapper";
import {
  OfertaFormacaoNivelFormacaoCreateCommand,
  OfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneQueryResult,
  OfertaFormacaoNivelFormacaoListQuery,
  OfertaFormacaoNivelFormacaoUpdateCommand,
} from "@/modules/ensino/oferta-formacao-nivel-formacao";
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
  ): OfertaFormacaoNivelFormacaoListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new OfertaFormacaoNivelFormacaoListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.nivelFormacao.id"] = dto.filterNivelFormacaoId;
    input["filter.ofertaFormacao.id"] = dto.filterOfertaFormacaoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): OfertaFormacaoNivelFormacaoFindOneQuery {
    const input = new OfertaFormacaoNivelFormacaoFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(
    dto: OfertaFormacaoNivelFormacaoCreateInputGraphQlDto,
  ): OfertaFormacaoNivelFormacaoCreateCommand {
    const input = new OfertaFormacaoNivelFormacaoCreateCommand();
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    input.nivelFormacao = { id: dto.nivelFormacao.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: OfertaFormacaoNivelFormacaoUpdateInputGraphQlDto,
  ): OfertaFormacaoNivelFormacaoFindOneQuery & OfertaFormacaoNivelFormacaoUpdateCommand {
    const input =
      new OfertaFormacaoNivelFormacaoFindOneQuery() as OfertaFormacaoNivelFormacaoFindOneQuery &
        OfertaFormacaoNivelFormacaoUpdateCommand;
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
    output: OfertaFormacaoNivelFormacaoFindOneQueryResult,
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
