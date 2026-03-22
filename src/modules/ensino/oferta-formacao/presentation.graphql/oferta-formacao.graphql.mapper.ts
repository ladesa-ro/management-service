import { ModalidadeGraphqlMapper } from "@/modules/ensino/modalidade/presentation.graphql/modalidade.graphql.mapper";
import {
  OfertaFormacaoCreateCommand,
  OfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneQueryResult,
  OfertaFormacaoListQuery,
  OfertaFormacaoUpdateCommand,
} from "@/modules/ensino/oferta-formacao";
import { createListOutputMapper, mapDatedFields } from "@/shared/mapping";
import {
  OfertaFormacaoCreateInputGraphQlDto,
  OfertaFormacaoFindOneOutputGraphQlDto,
  OfertaFormacaoListInputGraphQlDto,
  OfertaFormacaoListOutputGraphQlDto,
  OfertaFormacaoUpdateInputGraphQlDto,
} from "./oferta-formacao.graphql.dto";

export class OfertaFormacaoGraphqlMapper {
  static toListInput(
    dto: OfertaFormacaoListInputGraphQlDto | null,
  ): OfertaFormacaoListQuery | null {
    if (!dto) {
      return null;
    }

    const input = new OfertaFormacaoListQuery();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.modalidade.id"] = dto.filterModalidadeId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): OfertaFormacaoFindOneQuery {
    const input = new OfertaFormacaoFindOneQuery();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(dto: OfertaFormacaoCreateInputGraphQlDto): OfertaFormacaoCreateCommand {
    const input = new OfertaFormacaoCreateCommand();
    input.nome = dto.nome;
    input.slug = dto.slug;
    input.modalidade = { id: dto.modalidade.id };
    return input;
  }

  static toUpdateInput(
    params: { id: string },
    dto: OfertaFormacaoUpdateInputGraphQlDto,
  ): OfertaFormacaoFindOneQuery & OfertaFormacaoUpdateCommand {
    const input = new OfertaFormacaoFindOneQuery() as OfertaFormacaoFindOneQuery &
      OfertaFormacaoUpdateCommand;
    input.id = params.id;
    if (dto.nome !== undefined) {
      input.nome = dto.nome;
    }
    if (dto.slug !== undefined) {
      input.slug = dto.slug;
    }
    if (dto.modalidade !== undefined) {
      input.modalidade = { id: dto.modalidade.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: OfertaFormacaoFindOneQueryResult,
  ): OfertaFormacaoFindOneOutputGraphQlDto {
    const dto = new OfertaFormacaoFindOneOutputGraphQlDto();
    dto.id = output.id;
    dto.nome = output.nome;
    dto.slug = output.slug;
    dto.modalidade = ModalidadeGraphqlMapper.toFindOneOutputDto(output.modalidade);
    mapDatedFields(dto, output);
    return dto;
  }

  static toListOutputDto = createListOutputMapper(
    OfertaFormacaoListOutputGraphQlDto,
    OfertaFormacaoGraphqlMapper.toFindOneOutputDto,
  );
}
