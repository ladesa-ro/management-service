import {
  OfertaFormacaoNivelFormacaoCreateInput,
  OfertaFormacaoNivelFormacaoFindOneInput,
  OfertaFormacaoNivelFormacaoFindOneOutput,
  OfertaFormacaoNivelFormacaoListInput,
  OfertaFormacaoNivelFormacaoListOutput,
  OfertaFormacaoNivelFormacaoUpdateInput,
} from "@/modules/oferta-formacao-nivel-formacao";
import { NivelFormacaoFindOneOutputDto } from "@/server/nest/modules/nivel-formacao/rest/nivel-formacao.rest.dto";
import { OfertaFormacaoFindOneOutputDto } from "@/server/nest/modules/oferta-formacao/rest/oferta-formacao.rest.dto";
import { mapPaginationMeta } from "@/server/nest/shared/mappers";
import {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "../rest/oferta-formacao-nivel-formacao.rest.dto";
import {
  OfertaFormacaoNivelFormacaoListInputGqlDto,
  OfertaFormacaoNivelFormacaoListOutputGqlDto,
} from "./oferta-formacao-nivel-formacao.graphql.dto";

export class OfertaFormacaoNivelFormacaoGraphqlMapper {
  static toListInput(
    dto: OfertaFormacaoNivelFormacaoListInputGqlDto | null,
  ): OfertaFormacaoNivelFormacaoListInput | null {
    if (!dto) {
      return null;
    }

    const input = new OfertaFormacaoNivelFormacaoListInput();
    input.page = dto.page;
    input.limit = dto.limit;
    input.search = dto.search;
    input.sortBy = dto.sortBy;
    input["filter.id"] = dto.filterId;
    input["filter.nivelFormacao.id"] = dto.filterNivelFormacaoId;
    input["filter.ofertaFormacao.id"] = dto.filterOfertaFormacaoId;
    return input;
  }

  static toFindOneInput(id: string, selection?: string[]): OfertaFormacaoNivelFormacaoFindOneInput {
    const input = new OfertaFormacaoNivelFormacaoFindOneInput();
    input.id = id;
    input.selection = selection;
    return input;
  }

  static toCreateInput(
    dto: OfertaFormacaoNivelFormacaoCreateInputDto,
  ): OfertaFormacaoNivelFormacaoCreateInput {
    const input = new OfertaFormacaoNivelFormacaoCreateInput();
    input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    input.nivelFormacao = { id: dto.nivelFormacao.id };
    return input;
  }

  static toUpdateInput(
    id: string,
    dto: OfertaFormacaoNivelFormacaoUpdateInputDto,
  ): OfertaFormacaoNivelFormacaoFindOneInput & OfertaFormacaoNivelFormacaoUpdateInput {
    const input =
      new OfertaFormacaoNivelFormacaoFindOneInput() as OfertaFormacaoNivelFormacaoFindOneInput &
        OfertaFormacaoNivelFormacaoUpdateInput;
    input.id = id;
    if (dto.ofertaFormacao !== undefined) {
      input.ofertaFormacao = { id: dto.ofertaFormacao.id };
    }
    if (dto.nivelFormacao !== undefined) {
      input.nivelFormacao = { id: dto.nivelFormacao.id };
    }
    return input;
  }

  static toFindOneOutputDto(
    output: OfertaFormacaoNivelFormacaoFindOneOutput,
  ): OfertaFormacaoNivelFormacaoFindOneOutputDto {
    const dto = new OfertaFormacaoNivelFormacaoFindOneOutputDto();
    dto.id = output.id;
    dto.ofertaFormacao = output.ofertaFormacao as unknown as OfertaFormacaoFindOneOutputDto;
    dto.nivelFormacao = output.nivelFormacao as unknown as NivelFormacaoFindOneOutputDto;
    dto.dateCreated = new Date(output.dateCreated);
    dto.dateUpdated = new Date(output.dateUpdated);
    dto.dateDeleted = output.dateDeleted ? new Date(output.dateDeleted) : null;
    return dto;
  }

  static toListOutputDto(
    output: OfertaFormacaoNivelFormacaoListOutput,
  ): OfertaFormacaoNivelFormacaoListOutputGqlDto {
    const dto = new OfertaFormacaoNivelFormacaoListOutputGqlDto();
    dto.meta = mapPaginationMeta(output.meta);
    dto.data = output.data.map((item) => this.toFindOneOutputDto(item));
    return dto;
  }
}
